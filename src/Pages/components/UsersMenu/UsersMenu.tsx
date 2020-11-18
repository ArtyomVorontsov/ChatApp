import React, { useContext, useEffect } from 'react'
import { DispatchContext } from '../../../context/ContextProvider';
import classes from './Styles/UsersMenu.module.css';
import UserItem from './UsersMenuItem/UserItem';
import { UserType } from '../../../types/types';
import { setSelectedUserAC } from '../../../context/Actions';
import { Col } from 'react-bootstrap';
import { ApolloError } from '@apollo/client';

type PropsType = {
  loading: boolean,
  error: ApolloError | undefined,
  users: Array<UserType>
}

const UsersMenu:React.FC<PropsType> = ({ loading, error, users }) => {
  const dispatch = useContext(DispatchContext);

  const currentUserHanlder = (username: string) => {
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

      <Col className={classes.allUsers}>
        {allUsers}
      </Col>

    );
  }
}




export default UsersMenu;