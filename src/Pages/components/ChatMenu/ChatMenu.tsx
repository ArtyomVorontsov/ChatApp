import React, { useState, useEffect, useContext } from 'react'
import classes from './Styles/ChatMenu.module.css';
import { UserType } from '../../../types/types';
import MessageComponent from './MessageComponent/MessageComponent';
import { gql, useSubscription } from '@apollo/client';
import { DispatchContext } from '../../../context/ContextProvider';
import { setNewMessageAC } from '../../../context/Actions';

type PropsType = {
    currentUserChat: UserType | undefined,
    sendMessage: any
}

const ChatMenu: React.FC<PropsType> = ({ currentUserChat, sendMessage }) => {

    console.log("rerender");
    console.log(currentUserChat)
    let allMessages: null | Array<JSX.Element> = null;

    if (currentUserChat?.userMessages != undefined) {
        allMessages = currentUserChat?.userMessages.map((message) => {
            return <MessageComponent message={message} />
        })
    }

    const [inputState, setInputState] = useState("");
    const [variables, setVariables] = useState({
        to: currentUserChat?.username,
        messageData: inputState
    })

    const inputStateHandler = (e: any) => {
        setInputState(e.target.value);
        setVariables({
            to: currentUserChat?.username,
            messageData: e.target.value
        });
    }

    const onSubmit = (e: any) => {
        if(e){
            e.preventDefault();
        }
        if (inputState !== "") {
            sendMessage({ variables });
            setInputState("");
        }
    }


    if (allMessages == null) {
        return (
            <div className={classes.chatMenu}>Select chat to start</div>
        )
    } else {
        return (
            <form className={classes.chatField} onSubmit={onSubmit}>
                    {allMessages.length !== 0 ?
                        <div className={classes.chatMenu}>
                            {allMessages}
                        </div> :
                        <div className={classes.firstChat}>
                            <p>Send your first message !</p>
                        </div>
                    }
                    <div className={classes.input}>
                        <input onChange={(e) => { inputStateHandler(e) }} value={inputState} type="text" />
                        <button onClick={onSubmit} type="submit"> Send </button>
                    </div>
            </form>
        )
    }
}


export default ChatMenu;