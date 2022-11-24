import React from 'react';
import RecentResultsIndicator from "./RecentResultsIndicator";
import QuizQuestionAnswer from "./QuizQuestionAnswer";

export default function QuizQuestion({quizQuestion, answerStates, handleAnswerClick}) {
    return (
        <div className="col">
            <div className="container rounded-4 bg-opacity-25 ps-4 pe-4 pt-4 pb-4 bg-secondary">
                <div className="row">
                    <div className="col-8">
                        <h2 className="text-dark">{quizQuestion.question}</h2>
                    </div>
                    <div className="col">
                        <RecentResultsIndicator recentResults={quizQuestion.recentResults}/>
                    </div>
                </div>

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
    );
}