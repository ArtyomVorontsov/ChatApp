import React, { useContext } from 'react'
import { DispatchContext } from '../../../context/ContextProvider';
import classes from './Styles/UsersMenu.module.css';
import UserItem from './UsersMenuItem/UserItem';
import { UserType } from '../../../types/types';
import { setSelectedUserAC } from '../../../context/Actions';
import { Container, Row, Col } from 'react-bootstrap';

export default function UsersMenu({ loading, error, users }: any) {
  const dispatch = useContext(DispatchContext);

  const currentUserHanlder = (username: any) => {
    //@ts-ignore
    dispatch(setSelectedUserAC(username))
  }

  if (error) {
    return (
      <div>
        some error
      </div>
    )
  }

  if (loading) {
    return <div>loading</div>
  } else {
    const allUsers = users.map((item: UserType) => {
      let lastMessage = {
        createdAt: item.lastMessage ? item.lastMessage.createdAt : undefined,
        messageData: item.lastMessage ? item.lastMessage.messageData : null
      }

      return <div onClick={() => currentUserHanlder(item.username)} key={item.id}>
        <UserItem username={item.username} selected={item.selected} lastMessage={lastMessage} />
      </div>
    })

    return (

      <Col className={"p-0 h-100 bg-white border border-right-dark"}>
        {allUsers}
      </Col>

    );
  }
}



