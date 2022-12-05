import React, {createContext, useEffect, useState} from 'react';
import LoginRegistration from "./LoginRegistration/LoginRegistration";

export const LoginStateContext = createContext();

function AuthWrapper({children}) {

    const [loginState, setLoginState] = useState({isLoggedIn: false});

    function handleLogin(userState) {
        if(userState.isLoggedIn){
            localStorage.setItem("loginState", JSON.stringify(userState));
        }
        setLoginState(userState);
    }
    function handleLogout(){
        localStorage.clear();
        setLoginState({isLoggedIn: false});
    }

    useEffect(() => {
        const storedLogin = localStorage.getItem("loginState");
        if(storedLogin){
            setLoginState(JSON.parse(storedLogin.toString()));
        }
    }, []);

    return (
        <div className="container mt-5">
            {loginState.isLoggedIn ?
                <LoginStateContext.Provider value={{loginState, handleLogout}}>{children}</LoginStateContext.Provider> :
                <LoginRegistration handleLogin={handleLogin}/>}
        </div>
    );
}

export default AuthWrapper;