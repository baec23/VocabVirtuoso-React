import React, {createContext, useState} from 'react';
import LoginRegistration from "./LoginRegistration/LoginRegistration";

export const LoginStateContext = createContext();

function AuthWrapper({children}) {

    const [loginState, setLoginState] = useState({isLoggedIn: false});

    function handleLogin(userState) {
        setLoginState(userState);
    }

    return (
        <>
            {loginState.isLoggedIn ?
                <LoginStateContext.Provider value={loginState}>{children}</LoginStateContext.Provider> :
                <LoginRegistration handleLogin={handleLogin}/>}
        </>
    );
}

export default AuthWrapper;