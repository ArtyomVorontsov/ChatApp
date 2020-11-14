let secret = require("../../config/JWT_SECRET");
let jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

module.exports = (context) => {

    let token
    const decoder = (token) => {
        jwt.verify(token, secret.JWT_SECRET, function (err, decoded) {
            if (err) {
                context.err = err
            } else {
                context.username = decoded.username;
            }
        });
    }

   
    //socket login
    if (context.connection) {
        token = context.connection.context.authorization.split("Bearer ")[1];
        decoder(token);
        if(context.err){
            throw new UserInputError("Unauthorized", { error: "You are unauthorized", Error: context.err });
        }
        
    } else {
        //http login
        if (context.req.headers && context.req.headers.authorization) {
            token = context.req.headers.authorization.split("Bearer ")[1];
            decoder(token);
        };
    }



    return context;
}
