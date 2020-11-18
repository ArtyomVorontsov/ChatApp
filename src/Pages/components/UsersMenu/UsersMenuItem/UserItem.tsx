import React from 'react'
import classes from './Styles/UserItem.module.css';
import dayjs from "dayjs";
import { Container, Row, Col } from 'react-bootstrap';

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
        <Container  className={ selected ? classes.userItemSelected : classes.userItem}>
            <Col xs={3} className={classes.userPicWrapper}>
                <div className={classes.userPic}>

                </div>
            </Col>
            <Col className={"d-flex flex-column"}>
                <Col className={classes.usernameWrapper}>
                    <p>{username}</p>
                </Col>
                <Col className={classes.dataWrapper}>
                    <p>{messageData}</p>
                    <span>{dayjs(createdAt).format("MMM DD HH:MM")}</span>
                </Col>
            </Col>

        </Container>
    )
}
export default UserItem