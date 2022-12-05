import React, {useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import {Link} from "react-router-dom";
import {LoginStateContext} from "../AuthWrapper";

function MyNavbar() {
    const authContext = useContext(LoginStateContext);
    const loginState = authContext.loginState;
    console.log(loginState);

    function handleLogout() {
        authContext.handleLogout();
    }

    return (
        <div className="navbar my-navbar navbar-expand-lg bg-light rounded-top mt-4 p-2">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Vocab Virtuoso - {loginState.userDisplayName}
                </Link>
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/create-bulk-vocab-list">Create Vocab List</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/my-stats">My Stats</Link>
                    </li>
                    {loginState &&
                        <li className="nav-item">
                            <Link className="nav-link" onClick={handleLogout}>Logout</Link>
                        </li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default MyNavbar;
