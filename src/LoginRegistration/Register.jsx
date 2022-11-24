import React, {useState} from 'react';
import serverUrl from "../Constants";

function Register({onRegistrationSuccessful, onLoginClicked}) {
    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [isRegistering, setRegistering] = useState(false);
    const [error, setError] = useState(null);

    function onUsernameChanged(text) {
        setUsername(text);
    }

    function onDisplayNameChanged(text) {
        setDisplayName(text);
    }

    function onPasswordChanged(text) {
        setPassword(text);
    }

    function onPassword2Changed(text) {
        setPassword2(text);
    }

    function handleRegister(e) {
        e.preventDefault();
        validateInputs();
        if (!error) {
            setRegistering(true);

            const requestBody = {id: null, username, password, displayName, roles: []};

            fetch(serverUrl() + '/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            }).then(res => {
                if (!res.ok) {
                    if(res.status === 409){
                        setError("User already exists!");
                    }
                    else{
                        setError("Couldn't register");
                    }
                    setRegistering(false);
                } else {
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
                    onRegistrationSuccessful(userState);
                    setRegistering(false);
                }
            }).catch(error => {
                setError(error.message);
                setRegistering(false);
            });
        }
    }

    function validateInputs() {
        if (username.length === 0) {
            setError("Username cannot be empty");
        } else if (displayName.length === 0) {
            setError("Display Name cannot be empty");
        } else if (password.length === 0) {
            setError("Password cannot be empty");
        } else if (password !== password2) {
            setError("Passwords do not match");
        } else {
            setError(null);
        }
    }

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
                        <label className="form-label" htmlFor="displayNameInput">Display Name</label>
                        <input type="text" id="displayNameInput" className="form-control" value={displayName}
                               onChange={(e) => {
                                   onDisplayNameChanged(e.target.value)
                               }}/>
                    </div>

                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="passwordInput">Password</label>
                        <input type="password" id="passwordInput" className="form-control" value={password}
                               onChange={(e) => {
                                   onPasswordChanged(e.target.value)
                               }}/>
                    </div>

                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="passwordInput2">Password Again</label>
                        <input type="password" id="passwordInput2" className="form-control" value={password2}
                               onChange={(e) => {
                                   onPassword2Changed(e.target.value)
                               }}/>
                    </div>

                    <div className="row row mb-4 ps-2 pe-2">
                        <button type="button" className="btn btn-primary mt-2" onClick={(e) => {handleRegister(e)}}>
                            {isRegistering ?
                                <div className="spinner-border" role="status">
                                    <span className="sr-only"></span>
                                </div> : "Register"
                            }
                        </button>
                    </div>

                </form>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="text-center">
                    <p>Already a member? <a href="#" onClick={onLoginClicked}>Login</a></p>
                </div>
            </div>
        </div>
    );
}

export default Register;