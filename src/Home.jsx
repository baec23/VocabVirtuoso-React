import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from "./hooks/useFetch";
import {useEffect, useState} from "react";
import VocabListSelector from "./components/VocabListSelector";
import serverUrl from "./Constants";

const Home = () => {

    const {data: allVocabLists, isPending, error} = useFetch(serverUrl() + "/vocab-list/all");
    const [selectedList, setSelectedList] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if(allVocabLists != null && allVocabLists.length > 0)
            setSelectedList(allVocabLists[0]);
    }, [allVocabLists])

    const handleStartQuiz = () => {
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