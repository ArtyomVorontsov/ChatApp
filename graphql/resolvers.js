const messagesResolvers = require("./resolvers/messagesResolvers");
const usersResolvers = require("./resolvers/usersResolvers");
const {PubSub} = require("apollo-server");
const pubSub = new PubSub();

module.exports = {

  UserWithLastMessage: {
    createdAt: (parent) => {
      return parent.createdAt.toISOString()
    },
  },

  Message: {
    createdAt: (parent) => {
      return parent.createdAt.toISOString()
    },
  },



  Query: {
    getUsers: usersResolvers.Query.getUsers,
    login: usersResolvers.Query.login,
    getUserChat: messagesResolvers.Query.getUserChat
  },

  Mutation: {
    createUser: usersResolvers.Mutation.createUser,
    sendMessage: messagesResolvers.Mutation.sendMessage,
    setReaction: messagesResolvers.Mutation.setReaction
  },

  Subscription: {
    ...messagesResolvers.Subscription
  }

};