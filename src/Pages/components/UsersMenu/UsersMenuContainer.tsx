import React, { useContext, useEffect } from 'react'
import { StateContext, DispatchContext } from '../../../context/ContextProvider';
import UsersMenu from './UsersMenu';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { setUsersAC } from '../../../context/Actions';


export default function UsersMenuContainer() {


    let dispatch = useContext(DispatchContext);

    const GET_USERS = gql`
        query getUsers{
          getUsers{
            username,
            id,
            lastMessage{
              messageData,
              createdAt
            }
          }
        }
      `
    const { loading, error, data } = useQuery(GET_USERS);

    let state = useContext(StateContext);

    useEffect(() => {
        
        if(data){
        //@ts-ignore
        dispatch(setUsersAC(data.getUsers));
        }
    }, [data])

    return (
        <UsersMenu loading={loading} error={error} users={state.users} />
    )
}
