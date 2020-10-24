const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    username: String,
    id: Int,
    email: String,
    userpic: String,
    createdAt: String,   
  }

  type CreatedUser{
    username: String,
    email: String
  }

  type LoginUsernameAndToken{
    username: String!,
    token: String!,
    createdAt: String
  }


  type Query {
    getUsers: [User],

    login(
      email: String!, 
      password: String!
    ): LoginUsernameAndToken
  }

  type Mutation {
    createUser(
      password: String!, 
      email: String!, 
      username: String!, 
      comfirmPassword: String!
    ): CreatedUser
  }
`;
//module.exports = typeDefs;
