import axios from "axios";
import exp from "constants";
const ASSIGNMENTS_API = "http://localhost:4000/api/assignments";
const COURSES_API = "http://localhost:4000/api/courses";


interface Assignment{
    _id: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    availableFromDate: string;
    availableUntilDate: string;
    course: string;
}
export const addAssignment = async (courseId: string, assignment: Assignment) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment);
    return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
    const response = await axios
        .delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
};

export const findAssignmentsForCourse = async (courseId: string | undefined) => {
    const response = await axios
        .get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
};

export const createAssignment = async (courseId: string | undefined,  assignment: Assignment) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/assignments`,
        assignment
    );
    return response.data;
};



export const updateAssignment = async ( assignment: Assignment) => {
    const response = await axios.put(
        `${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return response.data;
};

