import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findQuestionsByQuizId } from "../../clients";

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

interface QuizNavigationBarProps {
    courseId?: string;
    quizId?: string;
}
const QuizNavigationBar: React.FC<QuizNavigationBarProps> = ({ courseId, quizId }) => {

    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (courseId && quizId)  {
                const fetchedQuestions = await findQuestionsByQuizId(courseId, quizId);
                setQuestions(fetchedQuestions);
            }
        };
        fetchQuestions();
    }, [courseId, quizId]);

    return (
        <nav>
            <h2>Questions</h2>
            <ul>
                {questions.map((question, index) => (
                    <li key={question._id}>
                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/preview/questions/${question._id}`}>
                            Question {index + 1}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default QuizNavigationBar;