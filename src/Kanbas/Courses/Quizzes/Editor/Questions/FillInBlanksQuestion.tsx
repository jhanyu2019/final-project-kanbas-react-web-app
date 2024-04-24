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

const FillInBlanksQuestion = () => {
    const { courseId, quizId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [points, setPoints] = useState(1);
    const [questionText, setQuestionText] = useState('');
    const [blanks, setBlanks] = useState([{ answers: [''] }]);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPoints(parseInt(event.target.value, 10));
    };

    const handleQuestionTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestionText(event.target.value);
    };

    const handleBlanksChange = (index: number, answerIndex: number, value: string) => {
        const newBlanks = [...blanks];
        newBlanks[index].answers[answerIndex] = value;
        setBlanks(newBlanks);
    };

    const addBlank = () => {
        setBlanks([...blanks, { answers: [''] }]);
    };

    const removeBlank = (index: number) => {
        const newBlanks = [...blanks];
        newBlanks.splice(index, 1);
        setBlanks(newBlanks);
    };

    const addAnswer = (blankIndex: number) => {
        const newBlanks = [...blanks];
        newBlanks[blankIndex].answers.push('');
        setBlanks(newBlanks);
    };

    const removeAnswer = (blankIndex: number, answerIndex: number) => {
        const newBlanks = [...blanks];
        if (newBlanks[blankIndex].answers.length > 1) {
            newBlanks[blankIndex].answers.splice(answerIndex, 1);
            setBlanks(newBlanks);
        }
    };

    const handleSaveQuestion = async () => {
        if (!courseId || !quizId) {
            console.error('Course ID or Quiz ID is missing');
            return;
        }

        const question = {
            quizId,
            title,
            points,
            questionText,
            questionType: 'fillBlanks',
            blanks: blanks.map(blank => ({
                correctAnswers: blank.answers.map(answer => answer.trim().toLowerCase())
            }))
        };

        try {

            await client.createQuestionByQuizID(courseId, quizId, question);
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`);
        } catch (error) {
            console.error('Error saving question:', error);
        }
    };

    return (

        <div>
            <div className="label-container">
                <label><strong>Title:</strong></label>
                <input type="text" value={title} onChange={handleTitleChange} />
                <label><strong>PTS:</strong></label>
                <input type="number" value={points} onChange={handlePointsChange} />
            </div>
            <br/>
            <hr/>
            <label><strong>Question:</strong></label><br/>
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
                value={questionText}
                onChange={handleQuestionTextChange}
                style={{width: '50%'}}
            ></textarea>

            <div>
                {blanks.map((blank, index) => (
                    <div key={index}>
                        <h4>Blank {index + 1}</h4>
                        {blank.answers.map((answer, answerIndex) => (
                            <div key={answerIndex}>
                                <input
                                    type="text"
                                    value={answer}
                                    onChange={(e) => handleBlanksChange(index, answerIndex, e.target.value)}
                                />
                                <div className="button-group">
                                    <button onClick={() => removeAnswer(index, answerIndex)}>Remove Answer</button>
                                    <button onClick={() => addAnswer(index)}>Add Answer</button>
                                </div>
                            </div>
                        ))}
                        <div className="button-group">
                            <button onClick={() => removeBlank(index)}>Remove Blank</button>
                            {index === blanks.length - 1 && <button onClick={addBlank}>Add Blank</button>}
                        </div>
                    </div>
                ))}
            </div>


            <button onClick={handleSaveQuestion} className="save-button">Save/Update Question</button>
            <button type="button" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/edit`)}
                    className="cancel-button">
                Cancel
            </button>
        </div>
    );
};

export default FillInBlanksQuestion;
