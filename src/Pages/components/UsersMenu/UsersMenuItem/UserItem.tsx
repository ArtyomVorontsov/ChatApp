import React from 'react'
import classes from './Styles/UserItem.module.css';
import dayjs from "dayjs";

type PropsType = {
    username: String,
    selected: boolean | undefined,
    lastMessage: {
        createdAt: string | undefined,
        messageData: string | null
    }
}


const UserItem: React.FC<PropsType> = ({ username, lastMessage, selected }) => {

    let createdAt = lastMessage.createdAt;
    let messageData = lastMessage.messageData ? lastMessage.messageData : "You are connected.";
    messageData = messageData.length > 20 ? messageData.slice(0, 20) + "..." : messageData;
    return (
        <div className={selected ? classes.userItemSelected : classes.userItem}>
            <div className={classes.userPicWrapper}>
                <div className={classes.userPic}>

                </div>
            </div>
            <div className={classes.userInfo}>
                <div className={classes.usernameWrapper}>
                    <p>{username}</p>
                </div>
                <div className={classes.dataWrapper}>
                    <p>{messageData}</p>
                    <span>{dayjs(createdAt).format("MMM DD HH:MM")}</span>
                </div>
            </div>

        </div>
    )
}
export default UserItem