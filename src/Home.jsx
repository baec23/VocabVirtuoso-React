import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import VocabListSelector from "./components/VocabListSelector";
import serverUrl from "./Constants";
import useFetchListWithDefaults from "./hooks/useFetchListWithDefaults";

const Home = () => {

    const {resultData: allVocabLists, isPending} = useFetchListWithDefaults(serverUrl() + "/vocab-list/all", [{
        id: "all-en",
        name: "(All) English -> Korean",
        words: []
    }, {
        id: "all-ko",
        name: "(All) 한글 -> 영어",
        words: []
    }]);
    const [selectedList, setSelectedList] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        console.log(allVocabLists);
        if (allVocabLists != null && allVocabLists.length > 0)
            setSelectedList(allVocabLists[0]);
    }, [allVocabLists])

    const handleStartQuiz = () => {
        navigate("/quiz/" + selectedList.id);
    }

    return (
        <div className="container">
            <div className="col">
                <div className="row">
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