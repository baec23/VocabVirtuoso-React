import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import {Link} from "react-router-dom";

function MyNavbar() {
    return (
        <div className="navbar my-navbar navbar-expand-lg bg-light rounded-top mt-4 p-2">
            <div className="container">
                <Link className="navbar-brand" to="/">Vocab Virtuoso</Link>
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/create-vocab-list">Create Vocab List</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/create-bulk-vocab-list">Create Bulk Vocab List</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/view-vocab-lists">View Vocab Lists</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MyNavbar;
