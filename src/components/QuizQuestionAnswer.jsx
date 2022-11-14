import React from "react";

const QuizQuestionAnswer = ({quizQuestionAnswer, onClick}) => {
    return (
        <div className="QuizQuestionAnswer">
            <button onClick={() => {
                onClick(quizQuestionAnswer);
            }}>{quizQuestionAnswer.answerText}</button>
        </div>
    );
}

export default QuizQuestionAnswer