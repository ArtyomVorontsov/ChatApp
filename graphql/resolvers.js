const sequelize = require("sequelize");
const messagesResolvers = require("./resolvers/messagesResolvers");
const usersResolvers = require("./resolvers/usersResolvers");
module.exports = {

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