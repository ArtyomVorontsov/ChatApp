import React, { useContext, useEffect } from 'react'
import { StateContext, DispatchContext } from '../../../context/ContextProvider';
import ChatMenu from './ChatMenu';
import { gql, useQuery, useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { setMessagesToUserAC, setNewMessageAC } from '../../../context/Actions';
import classes from './Styles/ChatMenu.module.css';


export default function ChatMenuContainer() {

  let state = useContext(StateContext);
  let dispatch = useContext(DispatchContext);
  let currentUser = state.users.find((user) => {
    if (user.selected) {
      return user
    }
  })
  let username = currentUser?.username;
  console.log(username)

  let currentUserChat = state.users.find((user) => {
    if (user.selected) {
      return user
    }
  })


  const NEW_MESSAGES = gql`
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

  const newMessagesData = useSubscription(NEW_MESSAGES);


  useEffect(() => {
    console.log(newMessagesData.data)
    //@ts-ignore
    newMessagesData.loading === false ? dispatch(setNewMessageAC(newMessagesData.data.newMessage)) : console.log("loading")
  }, [newMessagesData.data])



  const SEND_MESSAGE = gql`
    mutation sendMessage($to: String!, $messageData: String!){
      sendMessage(to: $to, messageData: $messageData){
        messageData,
        from,
        to,
        createdAt,
      }
    }
  `


  const [sendMessage, messagesData] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) => {
      //@ts-ignore
     // dispatch(setNewMessageAC(data.sendMessage));
    },

    onError: (error) => {
      console.log(error)
      debugger
    }
  })


  const GET_USER_CHAT = gql`
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

  const { loading, data, error } = useQuery(GET_USER_CHAT, {
    variables: { otherUser: currentUserChat?.username },
    onCompleted: () => {
      //@ts-ignore
      dispatch(setMessagesToUserAC(data.getUserChat))

    }
  });


  if (currentUserChat === undefined) {
    return (
      <div className={classes.initialScreen}>
        <p>Select chat to send message</p>
      </div>
    )

  }
  //debugger
  if (loading) return <div>Loading</div>
  if (error) return <div>Error</div>



  return (

    <ChatMenu currentUserChat={currentUserChat} sendMessage={sendMessage} />

  )
}
