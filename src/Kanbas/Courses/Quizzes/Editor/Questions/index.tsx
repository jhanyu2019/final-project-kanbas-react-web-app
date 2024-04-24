import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { useParams, useNavigate } from 'react-router-dom';

import * as client from "../../clients";

import "./index.css";
const BASE_API = process.env.REACT_APP_BASE_API_URL;
const COURSES_API = `${BASE_API}/api/courses`;



export interface Question {
    _id: string;
    courseId: string;
    quizId: string;
    title: string;
    points: number;
    questionType: 'multipleChoice' | 'trueFalse' | 'fillBlanks';
    questionText: string;
    options?: {  _id: string,text: string; isCorrect: boolean }[];
    correctAnswer?: boolean;
    blanks?: { placeholder: string; correctAnswers: string[] }[];
}



function Questions() {
    const navigate = useNavigate();
    const { courseId, quizId } = useParams();
    const [questions, setQuestions] = useState<Question[]>([]);

    const handleNewQuestion = () => {

        navigate(`/Kanbas/courses/${courseId}/quizzes/${quizId}/edit/question`);
    };

    const fetchQuestions  = async () => {
        if (quizId && courseId) {
            try {
                const fetchQuestions = await client.findQuestionsByQuizId(courseId, quizId);
                setQuestions(fetchQuestions);
            } catch (error) {
                console.error('Failed to fetch question details:', error);
            }
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [courseId, quizId]);

    return (
        <div>


            {questions.map((question) => (
                <div key={question._id} className="list-group-item">
                </div>
            ))}

            <div className="button-group">
                <button onClick={handleNewQuestion} className="button">+ New Question</button>
                <button onClick={() => navigate(`true-false`)} className="button">+ New Question Group</button>
                <button onClick={() => navigate(`fill-in-blanks`)} className="button"><FontAwesomeIcon icon={faSearch} /> Find Questions</button>
            </div><hr/>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="notify-changes" name="notify-changes"/>
                <label className="form-check-label" htmlFor="notify-changes">
                    Notify users that this content has changed
                </label>
            </div>

        </div>
    );
}

export default Questions;

