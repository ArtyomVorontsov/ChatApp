const sequelize = require("sequelize");
const messagesResolvers = require("./resolvers/messagesResolvers");
const usersResolvers = require("./resolvers/usersResolvers");
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
    sendMessage: messagesResolvers.Mutation.sendMessage
  }
};