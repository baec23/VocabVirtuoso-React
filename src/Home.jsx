import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from "./hooks/useFetch";
import {useState} from "react";
import VocabListSelector from "./components/VocabListSelector";

const Home = () => {

    const {data: allVocabLists, isPending, error} = useFetch("http://localhost:8080/vocab-api/v1/vocab-list/all");
    const [selectedList, setSelectedList] = useState({});
    const navigate = useNavigate();
    const handleStartQuiz = () => {
        console.log(selectedList);
        navigate("/quiz/" + selectedList.id);
    }

    return (
        <div className="container">
            <div className="col">
                <div className="row mt-5">
                    {isPending && <div>Loading...</div>}
                    {allVocabLists &&
                        <VocabListSelector vocabLists={allVocabLists}
                                           onVocabListSelected={(selectedIndex) => {
                                               setSelectedList(allVocabLists[selectedIndex]);
                                           }}
                                           onStartClicked={() => {
                                               handleStartQuiz()
                                           }}/>}
                </div>
            </div>
        </div>
    );
}

export default Home;