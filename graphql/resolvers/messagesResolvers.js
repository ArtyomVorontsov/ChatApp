const { User } = require("../../models");
const { Messages } = require("../../models");
const { UserInputError } = require("apollo-server");

module.exports = {
    Query: {
        getUserChat: async (parent, { otherUser }, context, info) => {
            try {

                if (!context.username) {
                    throw new UserInputError("Unauthorized", { error: "You are unauthorized" })
                }
                let messages = await Messages.findAll({
                    where: {
                        from: [otherUser, context.username],
                        to: [context.username, otherUser]
                    },
                    order: [['createdAt', 'DESC']]
                })
                console.log(messages)
                return messages

            } catch (err) {
                let res = new UserInputError("Bad input", { errors: err });
                throw res;
            }
        }
    },

    Mutation: {
        sendMessage: async (parent, { to, messageData }, context, info) => {
            try {
                let username = context.username;
                let recipient = await User.findOne({ where: { username: to } });

                if (!context.username) {
                    throw new UserInputError("Unauthorized", { Error: "Unauthorized" });
                }

                if (!recipient) {
                    throw new UserInputError("User not found", { Error: "User not found" });
                };

                if (recipient.dataValues.username === username) {
                    throw new UserInputError("Sending error", { Error: "You cant send message yourself" });
                };

                console.log(recipient.dataValues.username);

                let res = await Messages.create({ from: username, to, messageData });
                return res;

            } catch (err) {
                let res = new UserInputError("Bad input", { errors: err });
                throw res;
            };
        }
    }
};