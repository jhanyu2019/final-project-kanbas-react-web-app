import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faItalic, faUnderline, faLink, faPencil, faTextHeight, faEllipsisV, faTrash } from "@fortawesome/free-solid-svg-icons";
import * as client from "../../clients";

const MultipleChoiceQuestion = () => {
    const { courseId, quizId, questionId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [points, setPoints] = useState(1);
    const [questionText, setQuestionText] = useState('');
    const [answerChoices, setAnswerChoices] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState(0);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPoints(parseInt(event.target.value, 10));
    };

    const handleQuestionTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestionText(event.target.value);
    };

    const handleAnswerChoiceChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswerChoices = [...answerChoices];
        newAnswerChoices[index] = event.target.value;
        setAnswerChoices(newAnswerChoices);
    };
    const handleCorrectAnswerChange = (index: number) => {
        setCorrectAnswer(index);
    };

    const handleAddChoice = () => {
        setAnswerChoices([...answerChoices, '']);
    };

    const handleRemoveChoice = (index: number) => {
        const newAnswerChoices = [...answerChoices];
        newAnswerChoices.splice(index, 1);
        setAnswerChoices(newAnswerChoices);
        if (correctAnswer === index) {
            setCorrectAnswer(0);
        } else if (correctAnswer > index) {
            setCorrectAnswer(correctAnswer - 1);
        }
    };

    const handleSaveQuestion = async () => {
        const question = {
            quizId: quizId,
            title,
            points,
            questionText,
            questionType: 'multipleChoice',
            options: answerChoices.map((choice, index) => ({
                text: choice,
                isCorrect: index === correctAnswer,
            })),
        };

        try  {
            if (courseId && quizId) { // Ensure both courseId and quizId are defined
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
            {/* Quiz Instructions */}
            <div className="quiz-instructions">
                <div className="quiz-instructions"
                     style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div className="question-title">
                        <label htmlFor="questionTitle"><strong>Question Title:</strong></label>
                        <input
                            id="questionTitle"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>

                    <div className="question-points">
                        <label htmlFor="questionPoints" style={{textAlign: 'right'}}><strong>PTS:</strong></label>
                        <input
                            id="questionPoints"
                            type="number"
                            value={points}
                            onChange={handlePointsChange}
                        />
                    </div>
                </div>

                {/* Toolbar */}
                <div className="toolbar">
                </div>

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


            <div className="multiple-choice-answers">
                <h3>Answer Choices:</h3>
                {answerChoices.map((answer, index) => (
                    <div key={index} className="answer-choice">
                        <input
                            type="text"
                            value={answer}
                            onChange={(event) => handleAnswerChoiceChange(index, event)}
                        />
                        <input
                            type="radio"
                            name="correct-answer"
                            checked={correctAnswer === index}
                            onChange={() => handleCorrectAnswerChange(index)}
                        />
                        <label>Correct</label>
                        {index > 1 && (
                            <button onClick={() => handleRemoveChoice(index)} title="Remove">
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        )}
                    </div>
                ))}
                <button onClick={handleAddChoice} className="add-choice-button">+ Add Choice</button>
            </div>

            <button onClick={handleSaveQuestion}  className="save-button">Save/Update Question</button>
            <button type="button" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/edit`)} className="cancel-button">
                Cancel
            </button>
        </div>
    );
};

export default MultipleChoiceQuestion;