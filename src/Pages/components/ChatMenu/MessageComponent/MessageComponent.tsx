import React from 'react'
import classes from './Styles/MessageComponent.module.css'
import dayjs from "dayjs";
export default function MessageComponent({ message }: any) {

    return (
        <div className={classes.messageBody}>
            <div className={classes.userPicWrapper}>
                <div className={classes.userPic}></div>
            </div>

            <div className={classes.fromAndData}>
                <div className={classes.messageFrom}>{message.from}</div>
                <div className={classes.messageData}>{message.messageData}</div>
            </div>

            <div className={classes.date}>
                <div><p>{dayjs(message.createdAt).format("HH:mm") }</p></div>
            </div>
        </div>
    )
}
