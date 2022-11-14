import Navbar from "./components/Navbar";
import VocabQuizQuestion from "./components/VocabQuizQuestion";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";
import CreateVocabList from "./CreateVocabList";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<Home/>}> </Route>
                        <Route exact path="/create-vocab-list" element={<CreateVocabList/>}> </Route>
                        <Route exact path="/quiz" element={<VocabQuizQuestion/>}> </Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
