let secret = require("../../config/JWT_SECRET");
let jwt = require("jsonwebtoken");


module.exports = (context) => {
    let token = context.req.headers.authorization.split("Bearer ")[1];
    if (context.req && context.req.headers.authorization) {
        jwt.verify(token, secret.JWT_SECRET, function (err, decoded) {
            if (err) {
                context.err = err
            }else{
                context.username = decoded.username;
            }
        });
    };
    return context;
}
