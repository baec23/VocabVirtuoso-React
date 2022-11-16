import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand">
                <div className="container">
                    <Link className="navbar-brand" to="/">Vocab Virtuoso</Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/create-vocab-list">Create Vocab List</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/view-vocab-lists">View Vocab Lists</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;