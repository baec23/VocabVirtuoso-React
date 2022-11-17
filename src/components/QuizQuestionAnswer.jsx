import React from "react";
import PropTypes from "prop-types";

const QuizQuestionAnswer = ({index, text, state, onClick}) => {
    switch (state) {
        case "correct":
            return (
                <div className="card btn btn-secondary bg-success text-start">
                    <div className="card-body">
                        <h4>{text} - Correct!</h4>
                    </div>
                </div>
            );
            break;
        case "incorrect":
            return (
                <div className="card btn btn-secondary bg-danger text-start">
                    <div className="card-body">
                        <h4>{text} - Incorrect!</h4>
                    </div>
                </div>
            );
            break;
        default:
            return (
                <div className="card btn btn-outline-secondary text-start" onClick={() => {
                    onClick(index);
                }}>
                    <div className="card-body">
                        <h4>{text}</h4>
                    </div>
                </div>
            );
    }
}

QuizQuestionAnswer.propTypes = {
    index: PropTypes.number,
    text: PropTypes.string,
    state: PropTypes.string,
    onClick: PropTypes.func
}

export default QuizQuestionAnswer