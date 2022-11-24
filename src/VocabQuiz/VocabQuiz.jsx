import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useFetchQuizQuestion from "./hooks/useFetchQuizQuestion";
import QuizQuestion from "./components/QuizQuestion";

function VocabQuiz() {
    const {vocabListId} = useParams();
    const [answerStates, setAnswerStates] = useState([]);
    const [quizState, setQuizState] = useState("not_loaded");
    const {
        quizQuestion,
        fetchStatus,
        error
    } = useFetchQuizQuestion(vocabListId, quizState);

    useEffect(() => {
        if (fetchStatus === "done") {
            const defaultAnswerStates = new Array(quizQuestion.answers.length);
            for (let i = 0; i < defaultAnswerStates.length; i++) {
                defaultAnswerStates[i] = "unanswered";
            }
            setAnswerStates(defaultAnswerStates);
            setQuizState("loaded");
        }
    }, [fetchStatus])

    const handleAnswerClick = (clickedAnswer, index) => {
        if (quizState === "not_loaded" || quizState === "answered_correctly")
            return;
        if (clickedAnswer.correct === true) {

            let newAnswerStates = [...answerStates];
            newAnswerStates[index] = "correct";
            setAnswerStates(newAnswerStates);
            setQuizState("answered_correctly");
        } else {

            let newAnswerStates = [...answerStates];
            newAnswerStates[index] = "incorrect";
            setAnswerStates(newAnswerStates);
            setQuizState("answered_incorrectly");
        }
    }
    console.log("Quiz Question : ");
    console.log(quizQuestion);

    return (
        <div className="container mt-5">
            {error && <div>{error}</div>}
            {quizState === "not_loaded" && <div>Loading...</div>}
            {quizQuestion && <QuizQuestion quizQuestion={quizQuestion} answerStates={answerStates}
                                           handleAnswerClick={(clickedAnswer, index) => {
                                               handleAnswerClick(clickedAnswer, index)
                                           }}/>}
        </div>
    );
}

VocabQuiz.propTypes = {
    vocabListId: PropTypes.number
}

export default VocabQuiz;