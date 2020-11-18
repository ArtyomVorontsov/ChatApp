import React, { useContext, useEffect } from 'react'
import { StateContext, DispatchContext } from '../../../context/ContextProvider';
import ChatMenu from './ChatMenu';
import { gql, useQuery, useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { setMessagesToUserAC, setNewMessageAC } from '../../../context/Actions';
import classes from './Styles/ChatMenu.module.css';
import {SEND_MESSAGE, NEW_MESSAGES, GET_USER_CHAT} from "../../../API/API"

export default function ChatMenuContainer() {

  let state = useContext(StateContext);
  let dispatch = useContext(DispatchContext);


  let currentUser = state.users.find((user) => {
    if (user.selected) {
      return user
    }
  })
  let username = currentUser?.username;
  

  const newMessagesData = useSubscription(NEW_MESSAGES);
  useEffect(() => {
    console.log(newMessagesData.data)
    //@ts-ignore
    newMessagesData.loading === false ? dispatch(setNewMessageAC(newMessagesData.data.newMessage)) : console.log("loading")
  }, [newMessagesData.data])



  const [sendMessage, messagesData] = useMutation(SEND_MESSAGE, {
    onError: (error) => {
      console.log(error)
    }
  })


  const { loading, data, error } = useQuery(GET_USER_CHAT, {
    variables: { otherUser: username },
    onCompleted: () => {
      //@ts-ignore
      dispatch(setMessagesToUserAC(data.getUserChat))
    }
  });


  if (currentUser === undefined) {
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

    <ChatMenu currentUserChat={currentUser} sendMessage={sendMessage} />

  )
}
