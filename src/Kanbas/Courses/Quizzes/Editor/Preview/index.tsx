
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link,Route, Routes } from 'react-router-dom';
import * as client from "../../clients";
import {findQuestionsByQuizId} from "../../clients";
import QuizNavigationBar from "./QuizNavigationBar";
import QuestionPage from "./QuestionPage";
import "./index.css";

interface Quiz {
    title: string;
    description: string;
    quizType: 'Graded Quiz' | 'Practice Quiz' | 'Graded Survey' | 'Ungraded Survey';
    points: number;
    assignmentGroup: 'Quizzes' | 'Exams' | 'Assignments' | 'Project';
    shuffleAnswers: boolean;
    timeLimit: string;
    multipleAttempts: boolean;
    showCorrectAnswers: 'Immediately' | 'After Submission' | 'At a Specific Date' | 'Never';
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate: Date;
    availableDate: Date;
    untilDate: Date;
}


export interface Question {
    _id: string;
    courseId: string;
    quizId: string;
    title: string;
    points: number;
    questionType: 'multipleChoice' | 'trueFalse' | 'fillBlanks';
    questionText: string;
    options?: {  _id: string; text: string; isCorrect: boolean }[];
    correctAnswer?: boolean;
    blanks?: { placeholder: string; correctAnswers: string[] }[];
}

const initialQuizState: Quiz = {
    title: '',
    description: '',
    quizType: 'Graded Quiz',
    points: 0,
    assignmentGroup: 'Quizzes',
    shuffleAnswers: true,
    timeLimit: '20 Minutes',
    multipleAttempts: false,
    showCorrectAnswers: 'Immediately',
    accessCode: '',
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: new Date(),
    availableDate: new Date(),
    untilDate: new Date(),
};


function Preview() {
    const {courseId, quizId, questionId} = useParams();

    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<Quiz>(initialQuizState);
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (courseId && quizId) {
                const fetchedQuestions = await findQuestionsByQuizId(courseId, quizId);
                setQuestions(fetchedQuestions);
            }
        };

        const fetchQuiz = async () => {
            if (quizId && courseId) {
                try {
                    const fetchedQuiz = await client.findQuizByIdAndCourseId(courseId, quizId);
                    setQuiz(fetchedQuiz);
                } catch (error) {
                    console.error('Failed to fetch quiz details:', error);
                }
            }
        };

        fetchQuestions();
        fetchQuiz();
    }, [courseId, quizId]);


    useEffect(() => {
        if (questions.length > 0 && !questionId) {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/preview/questions/${questions[0]._id}`);
        }
    }, [questions, courseId, quizId, questionId, navigate]);



    return (
        <div className="container">
            <div className="flexContainer">
                <div className="rightSide">
                    <div className="quiz-container">
                        {quiz && (
                            <header className="quiz-header">
                                <h1 className="quiz-title">{quiz.title}</h1>
                                <p>Quiz Instruction</p>
                            </header>
                        )}
                    </div>
                    <div className="questionPageContainer">
                        {questionId && <QuestionPage />}
                    </div>

                </div>
                <div className="leftside">
                    <QuizNavigationBar courseId={courseId} quizId={quizId} />
                </div>
            </div>
        </div>

    )







}

export default Preview;