import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBold, faEllipsisV,
    faItalic, faKeyboard,
    faLink,
    faPencil, faSearchPlus,
    faTextHeight,
    faUnderline
} from "@fortawesome/free-solid-svg-icons";
import React, {ChangeEvent, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";


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
interface DetailsProps {
    quiz: Quiz;
    setQuiz: React.Dispatch<React.SetStateAction<Quiz>>;
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
    // Ensure that 'date' is a Date object
    if (typeof date === 'string') {
        date = new Date(date);
    }

    // Check if 'date' is a valid Date object
    if (Object.prototype.toString.call(date) === "[object Date]") {
        if (isNaN(date.getTime())) {
            // Date is not valid
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
        // Not a date
        return '';
    }
};

function Details({ quiz, setQuiz }: DetailsProps) {
    const {courseId, quizId} = useParams<{ courseId: string; quizId?: string }>();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setQuiz({...quiz, [name]: value});
    };

    return (
        <div className="quiz-content">
            {/* Quiz Title */}
            <div className="quiz-title">
                <input
                    type="text"
                    id="quizTitle"
                    placeholder="Unnamed Quiz"
                    value={quiz.title}
                    onChange={e => setQuiz({...quiz, title: e.target.value})}
                />
            </div>

            {/* Quiz Instructions */}
            <div className="quiz-instructions">
                <label htmlFor="quizInstructions">Quiz Instructions:</label>
                {/* Toolbar */}
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
                    id="quizInstructions"
                    value={quiz.description}
                    onChange={e => setQuiz({...quiz, description: e.target.value})}
                ></textarea>
            </div>
            <div className="toolbar-container">
                <div className="toolbar">
  <span className="toolbar-item">
    <FontAwesomeIcon icon={faKeyboard} style={{color: 'red'}}/>
  </span>{' '}{' '}
                    <span className="toolbar-separator">|</span>{' '}{' '}
                    <span className="toolbar-item" style={{color: 'red'}}>0 words</span>{' '}{' '}
                    <span className="toolbar-separator">|</span>{' '}{' '}
                    <span className="toolbar-item">
    <FontAwesomeIcon icon={faSearchPlus} style={{color: 'red'}}/>
  </span>{' '}{' '}
                    <span className="toolbar-item">
    <FontAwesomeIcon icon={faEllipsisV} style={{color: 'red'}}/>
  </span>
                </div>
            </div>

            {/* Quiz Details */}
            <div className="quiz-details">
                <div className="form-group">
                    <label htmlFor="quizType">Quiz Type:</label>
                    <select
                        id="quizType"
                        value={quiz.quizType}
                        onChange={e => setQuiz({...quiz, quizType: e.target.value as Quiz['quizType']})}
                    >
                        <option value="Graded Quiz">Graded Quiz</option>
                        <option value="Practice Quiz">Practice Quiz</option>
                        <option value="Graded Survey">Graded Survey</option>
                        <option value="Ungraded Survey">Ungraded Survey</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="assignmentGroup">Assignment Group:</label>
                    <select
                        id="assignmentGroup"
                        value={quiz.assignmentGroup}
                        onChange={e => setQuiz({
                            ...quiz,
                            assignmentGroup: e.target.value as Quiz['assignmentGroup']
                        })}
                    >
                        <option value="Quizzes">Quizzes</option>
                        <option value="Exams">Exams</option>
                        <option value="Assignments">Assignments</option>
                        <option value="Project">Project</option>
                    </select>
                </div>
            </div>

            {/* Quiz Options */}
            <div className="quiz-options">
                <h3>Options</h3>
                <div className="options-container">
                    <div className="option">
                        <label>
                            <input
                                type="checkbox"
                                checked={quiz.shuffleAnswers}
                                onChange={e => setQuiz({...quiz, shuffleAnswers: e.target.checked})}
                            />
                            Shuffle Answers
                        </label>
                    </div>
                    <div className="option">
                        <label>
                            <input
                                type="checkbox"
                                checked={quiz.timeLimit !== ''}
                                onChange={e => setQuiz({...quiz, timeLimit: e.target.checked ? '20 Minutes' : ''})}
                            />
                            Time Limit
                        </label>
                        {quiz.timeLimit !== '' && (
                            <input
                                type="text"
                                value={quiz.timeLimit}
                                onChange={e => setQuiz({...quiz, timeLimit: e.target.value})}
                            />
                        )}
                    </div>
                    <div className="option-box">
                        <label>
                            <input
                                type="checkbox"
                                checked={quiz.multipleAttempts}
                                onChange={e => setQuiz({...quiz, multipleAttempts: e.target.checked})}
                            />
                            Allow Multiple Attempts
                        </label>
                    </div>
                    <div className="option">
                        <label>
                            Show Correct Answers:
                            <select
                                value={quiz.showCorrectAnswers}
                                onChange={e => setQuiz({
                                    ...quiz,
                                    showCorrectAnswers: e.target.value as Quiz['showCorrectAnswers']
                                })}
                            >
                                <option value="Immediately">Immediately</option>
                                <option value="After Submission">After Submission</option>
                                <option value="At a Specific Date">At a Specific Date</option>
                                <option value="Never">Never</option>
                            </select>
                        </label>
                    </div>
                    <div className="option">
                        <label>
                            Access Code:
                            <input
                                type="text"
                                value={quiz.accessCode}
                                onChange={e => setQuiz({...quiz, accessCode: e.target.value})}
                            />
                        </label>
                    </div>
                    <div className="option">
                        <label>
                            <input
                                type="checkbox"
                                checked={quiz.oneQuestionAtATime}
                                onChange={e => setQuiz({...quiz, oneQuestionAtATime: e.target.checked})}
                            />
                            One Question at a Time
                        </label>
                    </div>

                    {/* Webcam Required Option */}
                    <div className="option">
                        <label>
                            <input
                                type="checkbox"
                                checked={quiz.webcamRequired}
                                onChange={e => setQuiz({...quiz, webcamRequired: e.target.checked})}
                            />
                            Webcam Required
                        </label>
                    </div>

                    {/* Lock Questions After Answering Option */}
                    <div className="option">
                        <label>
                            <input
                                type="checkbox"
                                checked={quiz.lockQuestionsAfterAnswering}
                                onChange={e => setQuiz({...quiz, lockQuestionsAfterAnswering: e.target.checked})}
                            />
                            Lock Questions After Answering
                        </label>
                    </div>
                </div>
            </div>


            <table className="form-table">
                <tr>
                    <td><label>Assign</label></td>
                    <td>
                        <div className="form-container">
                            <div className="form-row">
                                <label>Point</label>
                                <div className="assign-to-input">
                                    <input
                                        type="text"
                                        value=""
                                        readOnly
                                        className="form-control"
                                    />

                                </div>
                            </div>
                            <div className="form-row">
                                <label>Assign to</label>
                                <div className="assign-to-input">
                                    <input
                                        type="text"
                                        value="Everyone  X"
                                        readOnly
                                        className="form-control"
                                    />

                                </div>
                            </div>
                            <div className="form-row">
                                <label>Due Date</label>
                                <input
                                    name="dueDate"
                                    type="datetime-local"
                                    value={formatDateForInput(quiz.dueDate)}
                                    onChange={e => setQuiz({...quiz, dueDate: new Date(e.target.value)})}
                                    className="form-control mb-2"
                                />
                            </div>
                            <div className="form-row double">
                                <div>
                                    <label>Available from</label>
                                    <input
                                        name="availableDate"
                                        type="datetime-local"
                                        value={formatDateForInput(quiz.availableDate)}
                                        onChange={e => setQuiz({...quiz, availableDate: new Date(e.target.value)})}
                                        className="form-control mb-2"
                                    />
                                </div>
                                <div>
                                    <label>Until</label>
                                    <input
                                        name="untilDate"
                                        type="datetime-local"
                                        value={formatDateForInput(quiz.untilDate)}
                                        onChange={e => setQuiz({...quiz, untilDate: new Date(e.target.value)})}
                                        className="form-control mb-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>


    );
}

export default Details;
