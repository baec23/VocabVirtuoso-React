import {Component} from "react";
import {Link} from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <h1>Vocab Tester</h1>
                <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/create-vocab-list">Create</Link>
                </div>
            </nav>
        );
    }
}

export default Navbar;