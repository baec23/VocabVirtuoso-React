import useFetch from "../hooks/useFetch";
import QuizQuestionAnswer from "./QuizQuestionAnswer";
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from "prop-types";
import {useNavigate, useParams} from "react-router-dom";
import serverUrl from "../Constants";
import {useState} from "react";

const VocabQuiz = () => {
    const {vocabListId} = useParams();
    const [answerStates, setAnswerStates] = useState([]);
    const {
        data: quizQuestion,
        isPending,
        error
    } = useFetch(serverUrl() + "/quiz-question/" + vocabListId, onQuestionLoaded);
    const navigate = useNavigate();

    function onQuestionLoaded(quizQuestion) {
        const defaultAnswerStates = new Array(quizQuestion.answers.length);
        for (let i = 0; i < defaultAnswerStates.length; i++) {
            defaultAnswerStates[i] = "unanswered";
        }
        setAnswerStates(defaultAnswerStates);
    }

    const handleAnswerClick = (clickedAnswer, index) => {
        if (clickedAnswer.correct === true) {

            let newAnswerStates = [...answerStates];
            newAnswerStates[index] = "correct";
            setAnswerStates(newAnswerStates);

            setTimeout(() => {
                navigate(0);
            }, 2000);
        } else {

            let newAnswerStates = [...answerStates];
            newAnswerStates[index] = "incorrect";
            setAnswerStates(newAnswerStates);
        }
    }

    return (
        <div className="container mt-5">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {quizQuestion &&
                <div className="col">
                    <div className="container rounded-4 bg-opacity-25 bg-dark ps-5 pe-5 pt-5 pb-5">
                        <h1>{quizQuestion.question}</h1>
                        {quizQuestion.answers.map((answer, index) => (
                            <div className="row mt-3" key={answer.answerText}>
                                <QuizQuestionAnswer index={index} state={answerStates[index]} text={answer.answerText}
                                                    onClick={(index) => {
                                                        handleAnswerClick(answer, index);
                                                    }}/>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

VocabQuiz.propTypes = {
    vocabListId: PropTypes.number
}

export default VocabQuiz;