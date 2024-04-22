import axios from "axios";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaBan } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";
import * as client from "./clients";

const formatDueDate = (dueDateString: string) => {
    const dueDate = new Date(dueDateString);
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    return dueDate.toLocaleString('en-US', options);
};

const determineStatus = (dueDateString: string) => {
    const now = new Date();
    const dueDate = new Date(dueDateString);

    if (dueDateString === null) {
        return 'Available Multiple Dates';
    } else if (now < dueDate) {
        return 'Open';
    } else {
        return 'Closed';
    }
};

interface Quiz {
    id: string;
    title: string;
    status: string;
    dueDate: string;
    points: number;
    questionCount: number;
    published: boolean;
}
function Quizzes() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [activeQuizMenu, setActiveQuizMenu] = useState<string | null>(null);
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleContextMenu = (quizId: string | null) => {
        setActiveQuizMenu(prevActiveQuizMenu => prevActiveQuizMenu === quizId ? null : quizId);
    };
    const handleEditQuiz = (quizId: string) => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
        setActiveQuizMenu(null);
    };
    const handleAddQuiz = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/new`);
    };

    const fetchQuizzes = async () => {
        if (courseId) {
            try {
                const quizzesData = await client.findQuizzesByCourseId(courseId);
                setQuizzes(quizzesData);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        } else {
            console.error('courseId is undefined');
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, [courseId]);

    return (
        <div className="flex-fill" style={{ marginTop: '70px' }}>
            <div className="d-flex justify-content-between mt-3">
                <input
                    className="form-control"
                    placeholder="Search for Quiz"
                    style={{ maxWidth: '200px', width: '100%' }}
                />
                <div className="buttons-container">
                    <button className="btn btn-danger" onClick={handleAddQuiz}>
                        + Quiz
                    </button>
                    <button className="btn button-icon">
                        <FaEllipsisV />
                    </button>
                </div>
            </div>
            <hr />
            <br />
            <div className="list-group">
                <div className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <FaEllipsisV className="me-2" /> <strong> Assignment Quizzes</strong>
                        </div>
                    </div>
                </div>
                {quizzes.map((quiz) => (
                    <div key={quiz.id} className="list-group-item">
                        <div className="d-flex justify-content-between">
                            <div>
                                <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`}>
                                    {quiz.title}
                                </Link>
                                <p className="mb-0">
                                    <strong>{determineStatus(quiz.dueDate)}</strong> | <strong>Due</strong>{' '}
                                    {formatDueDate(quiz.dueDate)} | {quiz.points} pts |{' '}
                                    {quiz.questionCount} Questions
                                </p>
                            </div>
                            <div>
                                <FaEllipsisV
                                    onClick={() => handleContextMenu(quiz.id)}
                                    style={{ cursor: "pointer" }}
                                />
                                {quiz.published ? (
                                    <FaCheckCircle className="text-success" />
                                ) : (
                                    <FaBan className="text-danger" />
                                )}
                                {activeQuizMenu === quiz.id && (
                                    <div className="quiz-context-menu">
                                        <button onClick={() => handleEditQuiz(quiz.id)}>
                                            <BsPencil/> Edit
                                        </button>
                                        <button>
                                            <BsTrash3Fill/> Delete
                                        </button>
                                        <button>
                                            <FaPlusCircle/>{" "}
                                            {quiz.published ? "Unpublish" : "Publish"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Quizzes;