import React, {useState} from 'react';
import serverUrl from "../Constants";

function Login({onLoginSuccessful, onRegistrationClicked}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isRememberMeChecked, setRememberMe] = useState(true);
    const [isSigningIn, setSigningIn] = useState(false);
    const [error, setError] = useState(null);

    function onUsernameChanged(text) {
        setUsername(text);
    }

    function onPasswordChanged(text) {
        setPassword(text);
    }

    function handleLogin() {
        setSigningIn(true);

        const requestBody = {"username": username, "password": password};
        let formBody = [];
        for (let property in requestBody) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(requestBody[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(serverUrl() + '/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formBody
        }).then(res => {
            if (!res.ok) {
                setError("Couldn't log in");
                setSigningIn(false);
            }
            else{
                return res.json();
            }
        }).then(user => {
            if(user != null){
                setError(null);
                const userState = {
                    isLoggedIn: true,
                    userId: user.userId,
                    userDisplayName: user.displayName,
                    username: user.username,
                    access_token: user.access_token,
                    refresh_token: user.refresh_token
                };
                onLoginSuccessful(userState);
                setSigningIn(false);
            }
        }).catch(error => {
            setError(error.message);
            setSigningIn(false);
        });
        ;
    }

    const loginForm = () => {
        return (
            <div className="container">
                <div className="col col-8 m-auto">
                    <form>
                        <div className="form-outline mb-3">
                            <label className="form-label" htmlFor="usernameInput">Username</label>
                            <input type="text" id="usernameInput" className="form-control" value={username}
                                   onChange={(e) => {
                                       onUsernameChanged(e.target.value)
                                   }}/>
                        </div>

                        <div className="form-outline mb-3">
                            <label className="form-label" htmlFor="passwordInput">Password</label>
                            <input type="password" id="passwordInput" className="form-control" value={password}
                                   onChange={(e) => {
                                       onPasswordChanged(e.target.value)
                                   }}/>
                        </div>

                        <div className="row mb-4 ps-2 pe-2">
                            <div className="col">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value={isRememberMeChecked}
                                           id="rememberMe"
                                           onChange={(e) => {
                                               setRememberMe(e.target.checked)
                                           }}/>
                                    <label className="form-check-label" htmlFor="rememberMe"> Remember me </label>
                                </div>
                            </div>

                            <div className="col justify-content-end">
                                <p className="text-end"><a href="#">Forgot password?</a></p>
                            </div>

                            <button type="button" className="btn btn-primary mt-2" onClick={handleLogin}>
                                {isSigningIn ?
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only"></span>
                                    </div> : "Sign in"
                                }
                            </button>
                        </div>
                    </form>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="text-center">
                        <p>Not a member? <a href="#" onClick={onRegistrationClicked}>Register</a></p>
                    </div>

                </div>
            </div>
        );
    }

    return loginForm();
}

export default Login;