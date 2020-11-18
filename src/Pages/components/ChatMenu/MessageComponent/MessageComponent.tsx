import React, { useState, useContext, useEffect } from 'react'
import classes from './Styles/MessageComponent.module.css'
import dayjs from "dayjs";
import ReactionComponent from '../ReactionComponent/ReactionComponent';
import { MessageType } from '../../../../types/types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngry, faSmile, faFrown, faDizzy, faHeart } from "@fortawesome/free-solid-svg-icons"
import { gql, useMutation, useSubscription } from '@apollo/client';
import { DispatchContext } from '../../../../context/ContextProvider';
import { setNewReactionAC } from '../../../../context/Actions';
import { Container, Row, Col } from 'react-bootstrap';
import { NEW_REACTION, SET_REACTION } from "../../../../API/API"


type PropsType = {
    message: MessageType
}


const MessageComponent: React.FC<PropsType> = ({ message }) => {

    let [isOpen, setOpen] = useState(false);

    let reactionsHandler = () => {isOpen ? setOpen(false) : setOpen(true)}

    let dispatch = useContext(DispatchContext);


    let [setReaction, { data, loading, error }] = useMutation(SET_REACTION, {
        onError: (error) => {
            console.log(error)
        }
    });


    const newReaction = useSubscription(NEW_REACTION);

    useEffect(() => {

        if (!newReaction.loading) {
            //@ts-ignore
            dispatch(setNewReactionAC(newReaction.data.newReaction));
        }

    }, [newReaction.data])



    let chooseIcon = () => {
        switch (message.reaction) {
            case "SMILE":
                return "😀"


            case "ANGRY":
                return "😡"


            case "FROWN":
                return "🙁"


            case "DIZZY":
                return "😫"


            case "LOVE":
                return "❤️"

            default:
                return "🙁"
        }
    }
    let icon = chooseIcon();

    return (

        <Container className={"position-relative mb-3 mt-3 "} onClick={reactionsHandler} onMouseLeave={() => setOpen(false)}>
            <Row className={"justify-content-center"}>
                <ReactionComponent id={message.id} setReaction={setReaction} open={isOpen} />
                <Col className={"d-flex align-items-center justify-content-center"}>
                    <div className={"position-relative"}>
                        <div className={classes.userPic}></div>
                        {message.reaction ? <div><p className={classes.icon}>{icon}</p></div> : <div></div>}
                    </div>
                </Col>
                <Col className={"d-flex flex-column justify-content-center align-items-start"}>
                    <p className={classes.messageFrom}>{message.from}</p>
                    <p className={classes.messageData}>{message.messageData}</p>
                </Col>
                <Col className={"d-flex justify-content-center"}>
                    <div><p className={"text-white"}>{dayjs(message.createdAt).format("HH:mm")}</p></div>
                </Col>
            </Row>
        </Container>
    )
}

export default MessageComponent;