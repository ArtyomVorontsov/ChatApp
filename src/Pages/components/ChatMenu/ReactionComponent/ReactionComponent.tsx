import React, { useState } from 'react'
import classes from './Styles/ReactionComponent.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngry,faSmile, faFrown, faDizzy, faHeart } from "@fortawesome/free-solid-svg-icons"
import { ReactionType } from '../../../../types/types';

type propsType = {
    open: boolean,
    setReaction: any,
    id: Number
}

const ReactionComponent: React.FC<propsType> = ({ open, setReaction, id }) => {

    let setVariables = (typeOfReaction: ReactionType, messageId: Number) => {
        let variables = {
            typeOfReaction,
            messageId
        }
        setReaction({variables});
    }  
    

    if (open) {
        return (
            <div className={classes.reactionComponent}>
                <div onClick={() => setVariables("SMILE", id)} className={classes.icon}>😀</div>
                <div onClick={() => setVariables("ANGRY", id)} className={classes.icon}> 😡</div>
                <div onClick={() => setVariables("FROWN", id)} className={classes.icon}>🙁 </div>
                <div onClick={() => setVariables("DIZZY", id)} className={classes.icon}>😫</div>
                <div onClick={() => setVariables("LOVE", id)} className={classes.icon}>❤️</div>
            </div>
        )
    } else {
        return <></>
    }
}

export default ReactionComponent;