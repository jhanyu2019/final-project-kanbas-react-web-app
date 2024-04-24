import axios from "axios";
axios.defaults.withCredentials = true;

const BASE_API = process.env.REACT_APP_BASE_API_URL;
const COURSES_API = `${BASE_API}/api/courses`;
const QUIZZES_API = `${BASE_API}/api/quizzes`;


export const findAllQuizzes = async () => {
    const response = await axios.get(QUIZZES_API);
    return response.data;
}


export const findQuizByIdAndCourseId = async (courseId: string, quizId: string) => {
    try {
        const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching quiz by ID:', error);
        throw error;
    }
};


export const findQuizzesByCourseId = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
}



export const createQuizByCourseId = async (quiz: any, courseId: string)=> {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;

}


export const updateExistingQuiz = async (quizId: string, courseId: string, quiz: any)=> {
    const response = await axios.put(`${COURSES_API}/${courseId}/quizzes/${quizId}`, quiz);
    return response.data;

}

export const findAllQuestions = async ()=> {
    const response = await axios.get(`QUIZZES_API/questions`);
    return response.data;
}

export const findQuestionsByQuizId = async (courseId: string ,quizId: string)=> {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions`);
    return response.data;
}

export const findQuestionByIdAndQuizId = async (courseId: string, quizId: string, questionId: string)=> {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${questionId}`);
    return response.data;
}

export const createQuestionByQuizID = async (courseId: string , quizId: string, question: any) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions`, question);
    return response.data;
}

export const updateExistingQuestion = async (courseId: string , quizId: string, questionId: string, question: any) => {
    const response = await axios.put(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${questionId}`, question);
    return response.data;
}

export const updateQuizPublishStatus = async (courseId: string, quizId: string, isPublished: boolean) => {
    if (!courseId || !quizId) {
        console.error('CourseId or QuizId is undefined, cannot update publish status.');
        return Promise.reject('CourseId or QuizId is undefined');
    }
    try {
        const response = await axios.put(`${COURSES_API}/${courseId}/quizzes/${quizId}`, { isPublished });
        return response.data;
    } catch (error) {
        console.error('Error updating quiz publish status:', error);
        throw error;
    }
};

export const deleteQuiz = async (courseId: string, quizId: string): Promise<void> => {
    try {
        await axios.delete(`${COURSES_API}/${courseId}/quizzes/${quizId}`);
    } catch (error) {
        console.error('Error deleting quiz:', error);
        throw error;
    }
};

export const updateQuizPoints = async (courseId: string, quizId: string, points: number) => {
    try {
        const response = await axios.put(`${COURSES_API}/${courseId}/quizzes/${quizId}/points`, {
            points
        });

        console.log('Quiz points updated:', response.data);
    } catch (error) {
        console.error('Error updating quiz points:', error);
    }
};

export const updateQuizQuestionCount = async (courseId: string, quizId: string, questionCount: number) => {
    try {
        const response = await axios.put(`${COURSES_API}/${courseId}/quizzes/${quizId}/questionCount`, {
            questionCount
        });

        console.log('questionCount updated:', response.data);
    } catch (error) {
        console.error('Error updating questionCount:', error);
    }
};

