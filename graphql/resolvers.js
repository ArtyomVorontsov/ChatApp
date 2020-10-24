const { User } = require("../models");
const { UserInputError } = require("apollo-server");
const { AuthenticationError } = require("apollo-server");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/JWT_SECRET");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = {

  Query: {
    getUsers: async (parent, args, context, info) => {
      let username;
      try {
        let token = context.req.headers.authorization.split("Bearer ")[1];
        if (context.req && context.req.headers.authorization) {
          jwt.verify(token, JWT_SECRET , function (err, decoded) {
            console.log(decoded);
            if(err){
              throw new UserInputError("Unauthorized");
            }
            username = decoded.username;
          });
        }

        const users = await User.findAll({where: {username:{[Op.ne]: username}}});
        return users
      } catch (error) {
        throw error
      }
    },

    login: async (parent, args) => {
      const errors = {};
      const { password, email } = args;
      try {
        if (email.trim() === "") {
          errors.email = "email must not be empty"
          throw new UserInputError("input error", { errors })
        };

        if (password === "") { errors.password = "password must not be empty" };

        let user = await User.findOne({ where: { email } });
        if (!user) { errors.email = "user not found" };

        if (Object.keys(errors).length > 0) {
          throw new UserInputError("input error", { errors })
        };

        const correctPassword = await bcryptjs.compare(password, user.password);
        if (!correctPassword) {
          errors.password = "password is incorrect"
          throw new AuthenticationError("login error", { errors })
        };

        let token = jwt.sign({
          username: user.username
        }, JWT_SECRET, { expiresIn: '1h' });

        user = {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token
        }

        return {
          username: user.email,
          createdAt: user.createdAt,
          token: user.token
        }

      } catch (errors) {
        throw errors
      }
    }
  },


  Mutation: {
    createUser: async (parent, args) => {
      let { username, password, email, comfirmPassword } = args;
      let errors = {};
      try {
        if (username.trim() === "") { errors.username = "must not be empty" };
        if (email.trim() === "") { errors.email = "must not be empty" };
        if (password.trim() === "") { errors.password = "must not be empty" };
        if (comfirmPassword.trim() === "") { errors.comfirmPassword = "must not be empty" };

        if (password !== comfirmPassword) { errors.password = "passwords must be equal" };

        const hashedPassword = bcryptjs.hashSync(password, 6);
        console.log(hashedPassword)
        password = hashedPassword;

        if (Object.keys(errors).length > 0) {
          throw errors
        }
        let createdUser = await User.create({ username, password, email });
        return createdUser;

      } catch (err) {
        let res = new UserInputError("Bad input", { errors: err });
        throw res;
      }
    }
  }
};