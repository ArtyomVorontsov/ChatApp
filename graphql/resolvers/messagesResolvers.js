const { User } = require("../../models");
const { Messages } = require("../../models");
const { UserInputError } = require("apollo-server");
const { PubSub, withFilter } = require("apollo-server");
const pubSub = new PubSub();

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



                let res = await Messages.create({ from: username, to, messageData, createdAt: Date.now() });

                //event fire
                pubSub.publish("SEND_MESSAGE", { newMessage: res })

                return res;

            } catch (err) {
                let res = new UserInputError("Bad input", { errors: err });
                throw res;
            };
        },

        setReaction: async (parent, { messageId, typeOfReaction }, context, info) => {

            try {
                if (!context.username) {
                    throw new UserInputError("Unauthorized", { error: "Unauthorized" });
                }

                let message = await Messages.findOne({ where: { id: messageId } })

                if (message && context.username === message.from || context.username === message.to) {
                    newMessage = { ...message, reaction: typeOfReaction }
                    res = message.update(newMessage)
                }


                pubSub.publish("NEW_REACTION", { newReaction: message });

                return message

            } catch (error) {
                res = new UserInputError("Bad input", { errors: error });
                throw res;
            }
        }
    },



    Subscription: {
        newMessage: {
            subscribe: withFilter(
                () => pubSub.asyncIterator(["SEND_MESSAGE"]),
                (payload, variables, context) => {
                    let newMessage = payload.newMessage.dataValues;
                    return context.username === newMessage.from || context.username === newMessage.to
                }
            )
        },

        newReaction: {
            subscribe: withFilter(
                () => pubSub.asyncIterator(["NEW_REACTION"]),
                (payload, variables, context) => {
                    let newMessage = payload.newReaction.dataValues;
                    return context.username === newMessage.from || context.username === newMessage.to
                }
            )
        },
    }
};

