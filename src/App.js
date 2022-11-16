import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";
import CreateVocabList from "./CreateVocabList";
import ViewVocabLists from "./ViewVocabLists";
import VocabQuiz from "./components/VocabQuiz";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<Home/>}> </Route>
                        <Route exact path="/create-vocab-list" element={<CreateVocabList/>}> </Route>
                        <Route exact path="/view-vocab-lists" element={<ViewVocabLists/>}> </Route>
                        <Route exact path="/quiz/:vocabListId" element={<VocabQuiz/>}> </Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
