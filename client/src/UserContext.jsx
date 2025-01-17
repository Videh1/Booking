import {createContext} from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios"

export const UserContext = createContext({});

export function UserContextProvider({children})  {
    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(false);
    const [token,setToken] = useState("");
    useEffect(() => {
        if(!user)
        {
            const {data} =  axios.get('/profile').then(({data}) => {
                setUser(data);
                setReady(true);
            });
        }
    },[]);
    return(
        <UserContext.Provider value = {{user,setUser,ready ,setReady ,setToken , token}}>
            {children}
        </UserContext.Provider>
    )
}