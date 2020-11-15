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


type PropsType = {
    message: MessageType
}


const MessageComponent: React.FC<PropsType> = ({ message }) => {

    let [isOpen, setOpen] = useState(false);

    let reactionsHandler = () => {
        isOpen ? setOpen(false) : setOpen(true)
    }

    let dispatch = useContext(DispatchContext);

    let SET_REACTION = gql`
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

    let [setReaction, {data, loading, error} ] = useMutation(SET_REACTION,{
        onCompleted: (data) => {
            debugger
        },
        onError: (error) => {
            console.log(error)
        }
    });

    let NEW_REACTION = gql`
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

    const newReaction = useSubscription(NEW_REACTION);

    useEffect(()=>{
        
        if(!newReaction.loading){
            //@ts-ignore
            dispatch(setNewReactionAC(newReaction.data.newReaction));
        }

    }, [newReaction.data])


    let chooseIcon = () => {
        switch (message.reaction) {
            case "SMILE":
                return faSmile


            case "ANGRY":
                return faAngry


            case "FROWN":
                return faFrown


            case "DIZZY":
                return faDizzy


            case "LOVE":
                return faHeart

            default:
                return faFrown
        }
    }
    let icon = chooseIcon();
    console.log(message)
    return (
        <>

            <div onClick={reactionsHandler} onMouseLeave={() => setOpen(false)} className={classes.messageBody}>
                <ReactionComponent id={message.id} setReaction={setReaction} open={isOpen} />
                <div className={classes.userPicWrapper}>
                    <div className={classes.userPic}></div>
                    {message.reaction ? <FontAwesomeIcon size={"lg"} className={classes.icon} icon={icon} /> : <div></div>}

                </div>

                <div className={classes.fromAndData}>
                    <div className={classes.messageFrom}>{message.from}</div>
                    <div className={classes.messageData}>{message.messageData}</div>
                </div>

                <div className={classes.date}>
                    <div><p>{dayjs(message.createdAt).format("HH:mm")}</p></div>
                </div>
            </div>
        </>
    )
}

export default MessageComponent;