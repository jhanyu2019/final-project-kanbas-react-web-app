import axios from "axios";

const BASE_API = process.env.REACT_APP_BASE_API_URL;
const COURSES_API = `${BASE_API}/api/courses`;
const QUIZZES_API = `${BASE_API}/api/quizzes`;

// Fetch all quizzes
export const findAllQuizzes = async () => {
    const response = await axios.get(QUIZZES_API);
    return response.data;
}

// Fetch a quiz by its ID
export const findQuizByIdAndCourseId = async (courseId: string, quizId: string) => {
    try {
        const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching quiz by ID:', error);
        throw error;
    }
};

// Fetch quizzes for a specific course by course ID
export const findQuizzesByCourseId = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
}


//Create the new quiz by course ID
export const createQuizByCourseId = async (quiz: any, courseId: string)=> {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;

}

//Update existing quiz
export const updateExistingQuiz = async (quizId: string, courseId: string, quiz: any)=> {
    const response = await axios.put(`${COURSES_API}/${courseId}/quizzes/${quizId}`, quiz);
    return response.data;

}