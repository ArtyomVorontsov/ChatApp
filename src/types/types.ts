import { SET_MESSAGES_TO_USER, SET_NEW_MESSAGE, SET_SELECTED_USER, LOGOUT, LOGIN, SET_USERS } from './../context/Actions';


//Initial state type

export type InitialStateType = {
    user: {
        username: null | String,
        token: null | String
    },
    users: Array<UserType>,
}



export type MessageType = {
    messageData: String,
    from: String,
    to: String,
    createdAt?: String
    __typename?: String
}


export type UserType = {
    __typename?: String,
    id: number,
    username: String,
    userMessages?: Array<MessageType>,
    selected?: boolean
    lastMessage?: {
        createdAt: string,
        messageData: string | null
    }
}
 


//Action types 

export type LoginActionType = {
    type: typeof LOGIN,
    username: string,
    token: string
}

export type LogoutActionType = {
    type: typeof LOGOUT,
    username: null,
    token: null
}

export type SetMessagesToUserActionType = {
    type: typeof SET_MESSAGES_TO_USER ,
    messages: Array<MessageType>
}

export type SetSelectedUserActionType = {
    type: typeof SET_SELECTED_USER ,
    username: String
}

export type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}

export type SetNewMessageActionType = {
    type: typeof SET_NEW_MESSAGE,
    from: String,
    to: String,
    messageData: string,
    createdAt: string

}

export type UserReducerActionsType = LoginActionType | LogoutActionType | 
SetMessagesToUserActionType | SetSelectedUserActionType | SetUsersActionType |
SetNewMessageActionType
