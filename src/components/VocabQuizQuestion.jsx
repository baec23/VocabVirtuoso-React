import useFetch from "../hooks/useFetch";
import QuizQuestionAnswer from "./QuizQuestionAnswer";

const VocabQuizQuestion = () => {
    const {data: quizQuestion, isPending, error} = useFetch("http://localhost:8080/quiz-question");

    const handleAnswerClick = (clickedAnswer) => {
        if(clickedAnswer.correct === true)
            console.log("Correct answer");
        else
            console.log("Incorrect answer");
    }

    return (
        <div className="VocabQuizQuestion">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {quizQuestion &&
                <div>
                    <h1>{quizQuestion.question}</h1>
                    {quizQuestion.answers.map(quizAnswer => (
                            <QuizQuestionAnswer key={quizAnswer.answerText}
                                                quizQuestionAnswer={quizAnswer}
                                                onClick={handleAnswerClick}/>
                        )
                    )}
                </div>}
        </div>
    );
}
export default VocabQuizQuestion;