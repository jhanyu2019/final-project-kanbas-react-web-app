import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as client from "./../clients";
import { updateExistingQuiz } from "./../clients";
import Details from './Details';
import Questions from "./Questions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBold,
    faItalic,
    faUnderline,
    faLink,
    faTextHeight,
    faLockOpen,
    faPencil, faEllipsisV, faKeyboard, faSearchPlus
} from '@fortawesome/free-solid-svg-icons';
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

const formatDateForInput = (date: Date | string): string => {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    // Check if 'date' is a valid Date object
    if (Object.prototype.toString.call(date) === "[object Date]") {
        if (isNaN(date.getTime())) {
            return '';
        } else {
            // Format the date to YYYY-MM-DD
            const year = date.getFullYear();
            const month = (`0${date.getMonth() + 1}`).slice(-2);
            const day = (`0${date.getDate()}`).slice(-2);
            const hours = (`0${date.getHours()}`).slice(-2);
            const minutes = (`0${date.getMinutes()}`).slice(-2);
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        }
    } else {
        return '';
    }
};

function QuizEditor() {
    const { courseId, quizId } = useParams<{ courseId: string; quizId?: string }>();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState<Quiz>(initialQuizState);
    const [currentTab, setCurrentTab] = useState<'Details' | 'Questions'>('Details');


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

    const saveQuiz = async () => {
        if (!courseId) {
            console.error('No courseId provided');
            return;
        }

        if (!quizId || quizId === 'new') {
            try {
                const newQuiz = await client.createQuizByCourseId(quiz, courseId);
                navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
            } catch (error) {
                console.error('Failed to create quiz:', error);
            }
        } else {
            try {
                await client.updateExistingQuiz(quizId, courseId, quiz);
                navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
            } catch (error) {
                console.error('Failed to update quiz:', error);
            }
        }

    };
    const saveAndPublishQuiz = async () => {
        if (!courseId) {
            console.error('No courseId provided');
            return;
        }

        try {
            if (!quizId || quizId === 'new') {
                const newQuiz = await client.createQuizByCourseId(quiz, courseId);
                await client.updateQuizPublishStatus(courseId, newQuiz.id, true);
            } else {
                await client.updateExistingQuiz(quizId, courseId, quiz);
                await client.updateQuizPublishStatus(courseId, quizId, true);
            }
            navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
        } catch (error) {
            console.error('Failed to save or publish quiz:', error);
        }
    };


    useEffect(() => {
        fetchQuiz();
    }, [courseId, quizId]);

    return (
        <div className="quiz-editor">
            {/* Navigation Tabs */}
            <nav className="quiz-nav">
                <ul>
                    <li className={currentTab === 'Details' ? 'tab active' : 'tab'}>
                        <button onClick={() => setCurrentTab('Details')}>Details</button>
                    </li>
                    <li className={currentTab === 'Questions' ? 'tab active' : 'tab'}>
                        <button onClick={() => setCurrentTab('Questions')}>Questions</button>
                    </li>
                </ul>
            </nav>

            <div className="quiz-content">
                {currentTab === 'Details' && <Details quiz={quiz} setQuiz={setQuiz}/>}
                {currentTab === 'Questions' && <Questions/>}


                <div className="quiz-actions">
                    <button type="button" onClick={saveQuiz}>
                        Save Quiz
                    </button>
                    <button type="button" onClick={saveAndPublishQuiz} className="btn btn-success">
                        Save and Publish
                    </button>
                    <button type="button" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes`)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuizEditor;