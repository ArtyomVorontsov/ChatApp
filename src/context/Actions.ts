import {
    LoginActionType, LogoutActionType,
    SetMessagesToUserActionType, SetSelectedUserActionType, ReactionType, SetNewReactionType
} from "../types/types";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_MESSAGES_TO_USER = "SET_MESSAGES_TO_USER";
export const SET_SELECTED_USER = "SET_SELECTED_USER";
export const SET_USERS = "SET_USERS";
export const SET_NEW_MESSAGE = "SET_NEW_MESSAGE";
export const SET_NEW_REACTION = "SET_NEW_REACTION";



export const loginAC = ({username, token}: any): LoginActionType => {
    debugger
    return ({ type: LOGIN, username, token })
}

export const logoutAC = (): LogoutActionType => {
    return ({ type: LOGOUT, username: null, token: null })
}

export const setUsersAC = (users: any) => {
    return ({type: SET_USERS, users})
}

export const setMessagesToUserAC = ( messages: any): SetMessagesToUserActionType => {
    return ({ type: SET_MESSAGES_TO_USER, messages })
}

export const setSelectedUserAC = ( username: any): SetSelectedUserActionType => {
    return ({ type: SET_SELECTED_USER, username })
}

export const setNewMessageAC = ({from, to, messageData, createdAt, id}: {from: String, to: String, messageData: String, createdAt: String, id: Number}) => {
    return ({type: SET_NEW_MESSAGE, from, to, messageData, createdAt, id})
}

export const setNewReactionAC = ({reaction, id, to, from}: {reaction: ReactionType, id: Number, to: string, from: string}): SetNewReactionType => {
    return {type: SET_NEW_REACTION, reactionType: reaction, messageId: id, to, from }
}