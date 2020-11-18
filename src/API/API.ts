import { gql } from '@apollo/client';

export const GET_USERS = gql`
        query getUsers{
          getUsers{
            username,
            id,
            lastMessage{
              messageData,
              createdAt
            }
          }
        }
      `

export  const SEND_MESSAGE = gql`
mutation sendMessage($to: String!, $messageData: String!){
  sendMessage(to: $to, messageData: $messageData){
    messageData,
    from,
    to,
    createdAt,
  }
}
`

export const NEW_MESSAGES = gql`
subscription newMessage{
    newMessage{
    from
    to
    createdAt
    messageData
    reaction
    id
  }
}
`

export const GET_USER_CHAT = gql`
query getUserChat($otherUser: String!){
  getUserChat(otherUser: $otherUser){
    messageData
    from
    to
    createdAt
    id
    reaction
  }
}
`

export let NEW_REACTION = gql`
    subscription{
        newReaction{
            reaction
            from
            to
            from
            id
        }
    }
`

export let SET_REACTION = gql`
mutation setReaction($typeOfReaction: String!, $messageId: Int!){
    setReaction(typeOfReaction: $typeOfReaction, messageId: $messageId){
        id
        createdAt
        messageData
        reaction
        from
        to
    }
}
`

export const CREATE_USER = gql`mutation 
createUser($username: String!, $password: String!, $email: String!, $comfirmPassword: String!){
    createUser( username: $username, password: $password, email: $email, comfirmPassword: $comfirmPassword){
      username 
      email
  }
}`
