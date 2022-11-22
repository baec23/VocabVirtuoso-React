import React from "react";
import PropTypes from "prop-types";

const QuizQuestionAnswer = ({index, text, state, onClick}) => {
    switch (state) {
        case "correct":
            return (
                <div className="card btn btn-secondary bg-success text-start">
                    <div className="card-body">
                        <h5>{text} - Correct!</h5>
                    </div>
                </div>
            );
        case "incorrect":
            return (
                <div className="card btn btn-secondary bg-danger text-start">
                    <div className="card-body">
                        <h5>{text} - Incorrect!</h5>
                    </div>
                </div>
            );
        default:
            return (
                <div className="card btn btn-outline-primary text-start" onClick={() => {
                    onClick(index);
                }}>
                    <div className="card-body">
                        <h5>{text}</h5>
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