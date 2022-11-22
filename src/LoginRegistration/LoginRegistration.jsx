import React, {useState} from 'react';
import Login from "./Login";
import Register from "./Register";

function LoginRegistration({handleLogin}) {
    const [currScreen, setCurrScreen] = useState("login");

    function handleRegistration(){
        setCurrScreen("login");
    }

    return (
        <>
            {currScreen === "login" ? <Login onLoginSuccessful={handleLogin} onRegistrationClicked={() => {
                setCurrScreen("registration")
            }
            }/> : <Register onRegistrationSuccessful={handleRegistration} onLoginClicked={() => {
                setCurrScreen("login")
            }}/>}
        </>
    );
}

export default LoginRegistration;