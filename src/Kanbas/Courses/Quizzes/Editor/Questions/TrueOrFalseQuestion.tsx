import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as client from "../../clients";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBold,
    faEllipsisV,
    faItalic,
    faLink,
    faPencil,
    faTextHeight,
    faUnderline
} from "@fortawesome/free-solid-svg-icons";

function TrueOrFalseQuestion() {
    const { courseId, quizId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [points, setPoints] = useState(1);
    const [questionText, setQuestionText] = useState('');
    const [isTrue, setIsTrue] = useState(true);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPoints(parseInt(event.target.value, 10));
    };

    const handleQuestionTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestionText(event.target.value);
    };

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsTrue(event.target.value === 'true');
    };

    const handleSaveQuestion = async () => {
        const question = {
            quizId: quizId,
            title,
            points,
            questionText,
            questionType: 'trueFalse',
            correctAnswer: isTrue,
        };

        try {
            if (courseId && quizId) {
                const newQuestion = await client.createQuestionByQuizID(courseId, quizId, question);
                console.log('Question created:', newQuestion.data);
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`);
            } else {
                console.error('No courseId or quizId provided');
            }
        } catch (error) {
            console.error('Error saving question:', error);
        }
    };


    return (
        <div>
            <div className="quiz-instructions">
                <label htmlFor="questionTitle"><strong>Title:</strong></label>
                <input
                    id="questionTitle"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                />
                <label htmlFor="questionPoints"><strong>Points:</strong></label>
                <input
                    id="questionPoints"
                    type="number"
                    value={points}
                    onChange={handlePointsChange}
                /><hr/><br/>
                <label htmlFor="questionText"><strong>Question:</strong></label>
                <div className="toolbar">
                    <div className="toolbar-row">
                        <span>Edit</span>
                        <span>View</span>
                        <span>Insert</span>
                        <span>Format</span>
                        <span>Tools</span>
                        <span>Table</span>
                    </div>
                    <div className="toolbar-row">
                        <select>
                            <option>12pt</option>
                            <option>14pt</option>
                            {/* more options */}
                        </select>
                        <select>
                            <option>Paragraph</option>
                            <option>Heading 1</option>

                        </select>
                        |
                        <span className="toolbar-icon"><FontAwesomeIcon icon={faBold}/></span>
                        <span className="toolbar-icon"><FontAwesomeIcon icon={faItalic}/></span>
                        <span className="toolbar-icon"><FontAwesomeIcon icon={faUnderline}/></span>
                        <span className="toolbar-icon"> <FontAwesomeIcon icon={faLink}/></span>
                        <span className="toolbar-icon"><FontAwesomeIcon icon={faPencil}/></span>
                        <span className="toolbar-icon"><FontAwesomeIcon icon={faTextHeight}/></span>
                        |
                        <span><FontAwesomeIcon icon={faEllipsisV}/></span>


                    </div>
                </div>
                <textarea
                    id="questionText"
                    value={questionText}
                    onChange={handleQuestionTextChange}
                ></textarea>
            </div>

            <div className="true-false-answers">
                <label><strong>Correct Answer:</strong></label>
                <div>
                    <input
                        type="radio"
                        name="trueFalseAnswer"
                        value="true"
                        checked={isTrue}
                        onChange={handleAnswerChange}
                    />
                    <label>True</label>
                    <input
                        type="radio"
                        name="trueFalseAnswer"
                        value="false"
                        checked={!isTrue}
                        onChange={handleAnswerChange}
                    />
                    <label>False</label>
                </div>
            </div>

            <button onClick={handleSaveQuestion} className="save-button">Save/Update Question</button>
            <button type="button" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/edit`)} className="cancel-button">
                Cancel</button>
        </div>
    );




}

export default TrueOrFalseQuestion;