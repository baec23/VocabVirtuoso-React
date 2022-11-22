import {useContext, useEffect, useState} from "react";
import serverUrl from "../../Constants";
import {LoginStateContext} from "../../AuthWrapper";

function useFetchQuizQuestion(vocabListId, quizState) {

    const [fetchStatus, setFetchStatus] = useState("");
    const [error, setError] = useState(null);
    const [quizQuestion, setQuizQuestion] = useState(null);
    const loginState = useContext(LoginStateContext);

    let fetchUrl = serverUrl() + "/quiz-question";
    switch (vocabListId) {
        case "all-en":
            fetchUrl += "/all/ENGLISH";
            break;
        case "all-ko":
            fetchUrl += "/all/KOREAN";
            break;
        default:
            fetchUrl += "/" + vocabListId;
            break;
    }

    useEffect(() => {
        switch (quizState) {
            case "not_loaded":
                doFetch();
                break;
            case "answered_correctly":
                submitCorrectAnswer();
                setTimeout(() => {
                    doFetch()
                }, 1000);
                break;
            default:
                break;
        }
    }, [quizState]);

    function submitCorrectAnswer(){

    }

    function doFetch() {
        setFetchStatus("fetching");
        fetch(fetchUrl, {
            headers: {"Content-Type": "application/json",
                "Authorization": "Bearer " + loginState.access_token}
        })
            .then(res => {
                if (!res.ok) {
                    setFetchStatus("error");
                    setError("Could not fetch data");
                }
                return res.json();
            })
            .then(quizQuestion => {
                setQuizQuestion(quizQuestion);
                setFetchStatus("done");
                setError(null);
            })
            .catch(error => {
                setFetchStatus("error");
                setError(error.message);
            })
    }

    return {quizQuestion, fetchStatus, error};
}

export default useFetchQuizQuestion;