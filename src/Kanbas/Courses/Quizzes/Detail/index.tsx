import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as client from "./../clients";

interface Quiz {
    id: string;
    title: string;
    quizType: string;
    points: number;
    assignmentGroup: string;
    shuffleAnswers: string;
    timeLimit: string;
    multipleAttempts: string;
    showCorrectAnswers: string;
    accessCode: string;
    oneQuestionAtATime: string;
    webcamRequired: string;
    lockQuestionsAfterAnswering: string;
    dueDate: string;
    availableDate: string;
    untilDate: string;
    questionCount: number;
    status: string;
}

const formatDueDate = (dueDateString: string) => {
    const dueDate = new Date(dueDateString);
    const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };
    return dueDate.toLocaleString("en-US", options);
};

function QuizDetail() {
    const [quiz, setQuiz] = useState<Quiz>({
        id: "",
        title: "",
        quizType: "Graded Quiz",
        points: 0,
        assignmentGroup: "Quizzes",
        shuffleAnswers: "Yes",
        timeLimit: "20 Minutes",
        multipleAttempts: "No",
        showCorrectAnswers: "",
        accessCode: "",
        oneQuestionAtATime: "Yes",
        webcamRequired: "No",
        lockQuestionsAfterAnswering: "No",
        dueDate: "",
        availableDate: "",
        untilDate: "",
        questionCount: 0,
        status: "Open",
    });
    const { courseId, quizId } = useParams();
    const navigate = useNavigate();

    const fetchQuizDetails = async () => {
        console.log("Fetching quiz details for:", courseId, quizId);
        if (courseId && quizId) {
            try {
                const quizDetails = await client.findQuizByIdAndCourseId(courseId, quizId);
                console.log("Quiz data received:", quizDetails);
                setQuiz(quizDetails);
            } catch (error) {
                console.error('Error fetching quiz details:', error);
                navigate(-1); // Navigate back if there's an error
            }
        } else {
            console.error('quizId or courseId is undefined');
            navigate(-1); // Navigate back if IDs are missing
        }
    };

    const handleEditQuiz = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`);
    };


    useEffect(() => {
        fetchQuizDetails();
    }, [courseId, quizId]); // React to changes in both courseId and quizId

    return (
        <div>
            <button className="btn btn-danger" onClick={handleEditQuiz}>Edit</button>
            <h1>{quiz.title}</h1><br/>
            <table>
                <tbody>
                <tr>
                    <strong><td>Quiz Type:</td></strong>
                    <td>{quiz.quizType}</td>
                </tr>
                <tr>
                    <strong>
                        <td>Points:</td></strong>
                    <td>{quiz.points}</td>
                </tr>
                <tr>
                    <strong>
                        <td>Assignment Group:</td></strong>
                    <td>{quiz.assignmentGroup}</td>
                </tr>
                <tr>
                    <strong>
                        <td>Shuffle Answers:</td></strong>
                    <td>{quiz.shuffleAnswers}</td>
                </tr>
                <tr>
                    <strong>
                        <td>Time Limit:</td></strong>
                    <td>{quiz.timeLimit}</td>
                </tr>
                <tr>
                    <strong>
                        <td>Multiple Attempts:</td></strong>
                    <td>{quiz.multipleAttempts}</td>
                </tr>
                <tr>
                    <strong>
                        <td>Show Correct Answers:</td></strong>
                    <td>{quiz.showCorrectAnswers}</td>
                </tr>
                <tr>
                    <strong>
                        <td>Access Code:</td></strong>
                    <td>{quiz.accessCode || 'None'}</td>
                </tr>
                <tr>
                    <strong>
                        <td>One Question at a Time:</td></strong>
                    <td>{quiz.oneQuestionAtATime}</td>
                </tr>
                <tr>
                    <strong>
                        <td>Webcam Required:</td></strong>
                    <td>{quiz.webcamRequired}</td>
                </tr>
                <tr>
                    <strong>
                        <td>Lock Questions After Answering:</td></strong>
                    <td>{quiz.lockQuestionsAfterAnswering}</td>
                </tr>
                <tr>
                    <strong>
                        <td>Due Date:</td></strong>
                    <td>{formatDueDate(quiz.dueDate)}</td>
                </tr>
                <tr>
                    <strong>
                        <td>Available Date:</td></strong>
                    <td>{quiz.availableDate}</td>
                </tr>
                <tr>
                    <strong>
                        <td>Until Date:</td></strong>
                    <td>{quiz.untilDate}</td>
                </tr>
                <tr>
                    <strong>
                        <td>Question Count:</td></strong>
                    <td>{quiz.questionCount}</td>
                </tr>
                <tr>
                    <strong>
                        <td>Status:</td></strong>
                    <td>{quiz.status}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default QuizDetail;