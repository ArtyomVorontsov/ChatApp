import React, { createContext, useReducer } from 'react';
import { InitialStateType, UserReducerActionsType, UserType, MessageType } from '../types/types';
import { LOGIN, LOGOUT, SET_MESSAGES_TO_USER, SET_SELECTED_USER, SET_USERS, SET_NEW_MESSAGE, SET_NEW_REACTION } from './Actions';


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
    let updatedIndex: number = 0;
    let updatedUser: UserType | undefined;
    let updatedMessage: MessageType | undefined;
    let updatedUserIndex: number | undefined;
    let updatedUsers;

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
            localStorage.setItem("selectedUsername", action.username);

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
                if (user.selected && action.messages) {
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

        case SET_NEW_REACTION:

            //Getting user 
            updatedUser = state.users.find((user, index) => {
                updatedUserIndex = index;
                return user.username === action.to || user.username === action.from
            })

            //Getting message from new user
            if (updatedUser?.userMessages) {
                updatedMessage = updatedUser.userMessages.find((message, index) => {
                    updatedIndex = index
                    return message.id === action.messageId
                })

                if (updatedIndex !== undefined && updatedMessage !== undefined) {
                    updatedUser.userMessages[updatedIndex] = { ...updatedMessage, reaction: action.reactionType };
                }
            }

            //adding updated user to state
            if (updatedUser && updatedUserIndex) {
                updatedUsers = [...state.users];
                updatedUsers[updatedUserIndex] = updatedUser;

                return {
                    ...state,
                    users: updatedUsers
                }
            }

            return {
                ...state
            }



        case SET_NEW_MESSAGE:

            updatedUser = state.users.find((user, index) => {
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
                    messageData: action.messageData,
                    id: action.id,
                    reaction: null
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


