import MyNavbar from "./components/MyNavbar";
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import CreateVocabList from "./CreateVocabList";
import ViewVocabLists from "./ViewVocabLists";
import VocabQuiz from "./VocabQuiz/VocabQuiz";
import CreateBulkVocabList from "./CreateBulkVocabList/CreateBulkVocabList";
import "./App.css";
import Login from "./LoginRegistration/Login";
import AuthWrapper from "./AuthWrapper";
import Register from "./LoginRegistration/Register";

function App() {
    return (
        <div className="App m-auto">
            <MyNavbar/>
            <div className="content pt-5 m-auto">
                <AuthWrapper>
                    <Routes>
                        <Route exact path="/" element={<Home/>}> </Route>
                        <Route exact path="/login" element={<Login/>}> </Route>
                        <Route exact path="/register" element={<Register/>}> </Route>
                        <Route exact path="/create-vocab-list" element={<CreateVocabList/>}> </Route>
                        <Route exact path="/create-bulk-vocab-list" element={<CreateBulkVocabList/>}> </Route>
                        <Route exact path="/view-vocab-lists" element={<ViewVocabLists/>}> </Route>
                        <Route exact path="/quiz/:vocabListId" element={<VocabQuiz/>}> </Route>
                    </Routes>
                </AuthWrapper>
            </div>
        </div>
    );
}

export default App;
