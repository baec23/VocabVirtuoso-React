import React from "react";
import PropTypes from "prop-types";

const QuizQuestionAnswer = ({text, onClick}) => {
    return (
        <div className="card" onClick={() => {
            onClick();
        }}>
            <div className="card-body">
                {text}
            </div>
        </div>
    );
}

QuizQuestionAnswer.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func
}

export default QuizQuestionAnswer