import { useEffect } from "react";
import { createContext, useState } from "react";
import { useSelector } from "react-redux";

const AuthContext = createContext({});

export const AuthProvider = ({ children})=>{

    const login = useSelector((state)=> state.login);


    const [auth, setAuth] = useState({});


    const local = JSON.parse(localStorage.getItem('login'))

    useEffect(()=>{
        if(!local){
            setAuth(login.authData);
        }
    },[login])


    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;