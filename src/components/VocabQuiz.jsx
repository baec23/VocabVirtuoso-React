import useFetch from "../hooks/useFetch";
import QuizQuestionAnswer from "./QuizQuestionAnswer";
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";

const VocabQuiz = () => {
    const { vocabListId } = useParams();
    console.log(vocabListId);
    const {
        data: quizQuestion,
        isPending,
        error
    } = useFetch("http://localhost:8080/vocab-api/v1/quiz-question/" + vocabListId);

    const handleAnswerClick = (clickedAnswer) => {
        if (clickedAnswer.correct === true)
            console.log("Correct answer");
        else
            console.log("Incorrect answer");
    }

    return (
        <div className="VocabQuizQuestion">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {quizQuestion &&
                <div className="col">
                    {quizQuestion.answers.map((answer) => (
                        <div className="row">
                            <QuizQuestionAnswer text={answer.text} onClick={() => {
                                handleAnswerClick(answer);
                            }}/>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

VocabQuiz.propTypes = {
    vocabListId: PropTypes.number
}

export default VocabQuiz;