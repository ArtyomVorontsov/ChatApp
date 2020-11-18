import React, { useState, useEffect, useContext } from 'react'
import classes from './Styles/ChatMenu.module.css';
import { UserType } from '../../../types/types';
import MessageComponent from './MessageComponent/MessageComponent';
import { gql, useSubscription } from '@apollo/client';
import { DispatchContext } from '../../../context/ContextProvider';
import { setNewMessageAC } from '../../../context/Actions';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

type PropsType = {
    currentUserChat: UserType | undefined,
    sendMessage: any
}

const ChatMenu: React.FC<PropsType> = ({ currentUserChat, sendMessage }) => {

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
        if (e) {
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
            <Form onSubmit={onSubmit} className={classes.chatMenu}>
                <Form.Group className={"d-flex m-0 flex-column h-100 w-100 justify-content-space-around "}>
                    <Row className={" p-0 m-0 d-flex align-items-center justify-content-center border-bottom border-white"}>
                        <p>{currentUserChat?.username}</p>
                    </Row>

                    {allMessages.length !== 0 ?
                        <Container className={" pb-5 overflow-auto d-flex h-100 flex-column"}>
                            {allMessages}
                        </Container> :
                        <div className={classes.firstChat}>
                            <p>Send your first message !</p>
                        </div>
                    }



                    <Form.Group className={classes.inputWrapper}>
                        <Form.Control placeholder="Type a message..." className={classes.input} onChange={(e) => { inputStateHandler(e) }} value={inputState} type="text" />
                        <Button type="submit">Send</Button>
                    </Form.Group>
                </Form.Group>


            </Form>
        )
    }
}


export default ChatMenu;