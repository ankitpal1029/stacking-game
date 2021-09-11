import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {UserStatus} from './auth.types';

export const AuthContext = React.createContext<any>({} as UserStatus);

export function useAuth(){
    return useContext(AuthContext);
}


export default function AuthProvider(props: PropsWithChildren<any>){

    const [ currentUser, setCurrentUser ] = useState();


    useEffect(() => {
        axios.get("http://localhost:8000/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        }).then((res) => {
            setCurrentUser(res.data);
        })

    },[])

    return(
        <AuthContext.Provider value={currentUser}>{props.children}</AuthContext.Provider>
    );

}

