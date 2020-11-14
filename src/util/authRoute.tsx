import decoder from "jwt-decode";
import React, { useContext } from 'react'
import { Redirect } from "react-router-dom";
import { DispatchContext } from "../context/ContextProvider";

type DecodedType = {
    username: string,
    exp: number,
    iat: number 
}

export default function AuthRoute(props: any) {

    let dispatch = useContext(DispatchContext);

    let isLoginned = false;
    const token = localStorage.getItem("token");
   
    if(token && token !== "undefined"){
        const decodedToken: DecodedType = decoder(token);
        console.log(decodedToken);
        //@ts-ignore
        dispatch({type: "LOGIN", username: decodedToken.username, token});
        decodedToken.exp * 1000 < Date.now() ? isLoginned = false : isLoginned = true
    }

    if(props.authenticated){
        return(
            isLoginned ?
            {...props.children} : <Redirect to="/login"/>
        )
    }
    
    if(!props.authenticated){
       return(
           isLoginned ? <Redirect to="/"/> : {...props.children}
       )
    }
    
}
