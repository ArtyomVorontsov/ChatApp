import React, { createContext, useReducer } from 'react';
import { InitialStateType, UserReducerActionsType, UserType } from '../types/types';
import { LOGIN, LOGOUT, SET_MESSAGES_TO_USER, SET_SELECTED_USER, SET_USERS, SET_NEW_MESSAGE } from './Actions';


let initialState: InitialStateType = {
    user: {
        username: null,
        token: null
    },
    users: []
}


export const StateContext = createContext(initialState);
//@ts-ignore
export const DispatchContext = createContext();


const userReducer = (state = initialState, action: UserReducerActionsType): InitialStateType => {

    let users;

    switch (action.type) {
        case LOGIN:

            localStorage.setItem("token", action.token);
            return {
                ...state,
                user: {
                    username: action.username,
                    token: action.token
                }
            }

        case LOGOUT:


            return {
                ...state,
                user: {
                    username: null,
                    token: null
                }
            }

        case SET_USERS:
            return {
                ...state,
                users: [
                    ...action.users
                ]
            }

        case SET_SELECTED_USER:
            users = state.users.map((user) => {
                if (user.username === action.username) {
                    user.selected = true
                } else {
                    user.selected = false
                }

                return user
            })

            return {
                ...state,
                users: [
                    ...users
                ]
            }

        case SET_MESSAGES_TO_USER:

            users = state.users.map((user) => {
                if (user.selected) {
                    user.userMessages = action.messages.reverse();
                }
                return user
            })

            return {
                ...state,
                users: [
                    ...users
                ]
            }



        case SET_NEW_MESSAGE:

            
            let updatedIndex: number = 0;
            let updatedUser = state.users.find((user, index) => {
                updatedIndex = index;     
                return user.username === action.to || user.username === action.from
            })
            
            
            if (updatedUser?.userMessages !== undefined) {
                updatedUser.lastMessage = {
                    createdAt: action.createdAt,
                    messageData: action.messageData
                }
                updatedUser?.userMessages.push({
                    to: action.to,
                    from: action.from,
                    createdAt: action.createdAt,
                    messageData: action.messageData
                });
            }

            let newUsers = [...state.users];
            if (updatedUser) {
                newUsers[updatedIndex] = updatedUser;
            }

            
            return {
                ...state,
                users: [
                    ...newUsers
                ]
            }

        default:
            return {
                ...state,
                user: {
                    username: null,
                    token: null
                }
            }
    }
}

export let ContextProvider = (props: any) => {
    let [state, dispatch] = useReducer(userReducer, initialState);
    return (
        <StateContext.Provider value={state} {...props}>
            <DispatchContext.Provider value={dispatch} {...props} >
                {props.children}
            </DispatchContext.Provider>
        </StateContext.Provider>

    )
}


