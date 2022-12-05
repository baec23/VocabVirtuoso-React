import {useContext, useEffect, useState} from "react";
import serverUrl from "../../Constants";
import {LoginStateContext} from "../../AuthWrapper";

function useFetchQuizQuestion(vocabListId, quizState) {

    const [fetchStatus, setFetchStatus] = useState("");
    const [error, setError] = useState(null);
    const [quizQuestion, setQuizQuestion] = useState(null);
    const [hasAnsweredIncorrectly, setAnsweredIncorrectly] = useState(false);
    const authContext = useContext(LoginStateContext);
    const loginState = authContext.loginState;

    let fetchRequestParam;
    switch (vocabListId) {
        case "all-en":
            fetchRequestParam = {username: loginState.username, language: "ENGLISH"};
            break;
        case "all-ko":
            fetchRequestParam = {username: loginState.username, language: "KOREAN"};
            break;
        default:
            fetchRequestParam = {username: loginState.username, vocabListId: vocabListId};
            break;
    }

    useEffect(() => {
        switch (quizState) {
            case "not_loaded":
                doFetch(fetchRequestParam);
                break;
            case "answered_correctly":
                if (!hasAnsweredIncorrectly) {
                    submitAnswerResult(loginState.username, quizQuestion.question, 1);
                    addAnswerResult(true);
                }
                setTimeout(() => {
                    doFetch(fetchRequestParam)
                }, 1000);
                break;
            case "answered_incorrectly":
                submitAnswerResult(loginState.username, quizQuestion.question, -1);
                addAnswerResult(false);
                setAnsweredIncorrectly(true);
                break;
            default:
                break;
        }
    }, [quizState]);

    function submitAnswerResult(username, word, isCorrect) {
        const requestBody = {username: username, word: word, isCorrect: isCorrect};

        fetch(serverUrl() + "/quiz-question/answer", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + loginState.access_token
            },
            body: JSON.stringify(requestBody)
        }).then(res => {
            if (!res.ok) {
                console.log("Error Submitting Answer");
            }
        })
    }

    function generateQueryString(query) {
        const qs = Object.entries(query)
            .filter(pair => pair[1] !== undefined)
            .map(pair => pair.filter(i => i !== null).map(encodeURIComponent).join('='))
            .join('&');
        return qs && '?' + qs;
    }

    function addAnswerResult(isCorrect){
        let recentResults = [...quizQuestion.recentResults];
        for(let i=0; i<recentResults.length-1; i++){
            recentResults[i] = recentResults[i+1];
        }
        recentResults[recentResults.length-1] = isCorrect ? 1 : -1;
        setQuizQuestion({question: quizQuestion.question, answers: quizQuestion.answers, recentResults});
    }

    function doFetch(requestParam) {
        setFetchStatus("fetching");
        let fetchUrl;
        if (vocabListId === "all-en" || vocabListId === "all-ko")
            fetchUrl = serverUrl() + "/quiz-question/all";
        else
            fetchUrl = serverUrl() + "/quiz-question";
        fetch(fetchUrl + generateQueryString(requestParam), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + loginState.access_token
            }
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
                setAnsweredIncorrectly(false);
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