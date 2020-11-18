import React, { useContext, useEffect } from 'react'
import { StateContext, DispatchContext } from '../../../context/ContextProvider';
import UsersMenu from './UsersMenu';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { setUsersAC } from '../../../context/Actions';
import {GET_USERS} from "../../../API/API"

type PropsType = {

}

const UsersMenuContainer: React.FC<PropsType> = () => {

    let dispatch = useContext(DispatchContext);
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

export default UsersMenuContainer;