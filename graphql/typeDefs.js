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

  type SendedMessage{
    from: String!,
    to: String!,
    messageData: String!,
  }

  type Message{
    id: Int!,
    from: String!,
    to: String!,
    messageData: String!,
    createdAt: String!,
    UpdatedAt: String!
  }

  type UserWithLastMessage {
    username: String!,
    id: Int!,
    email: String,
    userpic: String!,
    createdAt: String!,
    lastMessage: Message  
  }


  type Query {
    getUsers: [UserWithLastMessage],

    login(
      email: String!, 
      password: String!
    ): LoginUsernameAndToken,

    getUserChat(
      otherUser: String!
    ):[Message]
  }

  type Mutation {
    createUser(
      password: String!, 
      email: String!, 
      username: String!, 
      comfirmPassword: String!
    ): CreatedUser

    sendMessage(
      to: String!,
      messageData: String!
    ): SendedMessage
  }
`;
//module.exports = typeDefs;
