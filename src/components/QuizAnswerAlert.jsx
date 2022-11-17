import PropTypes from "prop-types";

const QuizAnswerAlert = ({answerResult}) => {

    if (answerResult === "correct") {
        return (
            <div className="alert alert-success">
                Correct!
            </div>
        );
    }
    if (answerResult === "incorrect") {
        return (<div className="alert alert-danger">
            Incorrect!
        </div>);

    } else {
        return(<div></div>);
    }
}

QuizAnswerAlert.propTypes = {
    answerResult: PropTypes.string
}

export default QuizAnswerAlert;