const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { sequelize } = require("./models/index");
const loginMiddleware = require("./graphql/utils/loginMiddleware");

const server = new ApolloServer({ typeDefs, resolvers, context: async ({req, connection}) => {
  // console.log(req)
  // console.log(connection)
  // if (connection) {
  //   console.log(connection.context.Authorization)
  //   return loginMiddleware(connection)
  // } else {
    let res = {req, connection};
    return loginMiddleware(res)
  //}
} });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
  sequelize.authenticate()
    .then(() => {
      console.log("DB connected!")
    }).catch((err) => {
      console.log(err)
    })
});
