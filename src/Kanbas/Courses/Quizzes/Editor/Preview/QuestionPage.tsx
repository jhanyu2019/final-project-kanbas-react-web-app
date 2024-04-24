import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findQuestionByIdAndQuizId, findQuestionsByQuizId } from "../../clients";

export interface Question {
    _id: string;
    courseId: string;
    quizId: string;
    title: string;
    points: number;
    questionType: 'multipleChoice' | 'trueFalse' | 'fillBlanks';
    questionText: string;
    options?: { _id: string; text: string; isCorrect: boolean }[];
    correctAnswer?: boolean;
    blanks?: { placeholder: string; correctAnswers: string[] }[];
}

function QuestionPage() {
    const { courseId, quizId, questionId } = useParams<{ courseId: string; quizId: string; questionId: string }>();
    const [question, setQuestion] = useState<Question | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestion = async () => {
            if (courseId && quizId && questionId) {
                const fetchedQuestion = await findQuestionByIdAndQuizId(courseId, quizId, questionId);
                setQuestion(fetchedQuestion);
            }
        };
        fetchQuestion();
    }, [courseId, quizId, questionId]);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (courseId && quizId) {
                const fetchedQuestions = await findQuestionsByQuizId(courseId, quizId);
                setQuestions(fetchedQuestions);
            }
        };
        fetchQuestions();
    }, [courseId, quizId]);

    const handleNextQuestion = () => {
        if (question && questions.length > 0) {
            const currentIndex = questions.findIndex((q) => q._id === question._id);
            const nextQuestionId = questions[currentIndex + 1]?._id;
            if (nextQuestionId) {
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/preview/questions/${nextQuestionId}`);
            }
        }
    };

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className="question-container">
            <div className="question-header">
                <h2 className="question-title">{question.title}</h2>
                <h6 className="question-points">points: {question.points}</h6>
            </div>
            <div className="question-text">{question.questionText}</div>
            {/* Render question options based on question type */}
            <div className="options-container">
                {question.questionType === 'multipleChoice' && question.options && question.options.map((option) => (
                    <label className="option" key={option._id}>
                        <input type="radio" name={question._id} value={option.text} disabled /> {option.text}
                    </label>
                ))}

                {question.questionType === 'trueFalse' && (
                    <>
                        <label className="option">
                            <input type="radio" name={question._id} value="true" disabled /> True
                        </label>
                        <label className="option">
                            <input type="radio" name={question._id} value="false" disabled /> False
                        </label>
                    </>
                )}

                {question.questionType === 'fillBlanks' && question.blanks && question.blanks.map((blank, blankIndex) => (
                    <div key={blankIndex} className="blank">
                        <input type="text" placeholder={`Blank ${blankIndex + 1}`} disabled />
                    </div>
                ))}
            </div>

            <div className="button-container">
                <button className="next-button" onClick={handleNextQuestion}>Next</button>
            </div>
        </div>
    );

}

export default QuestionPage;