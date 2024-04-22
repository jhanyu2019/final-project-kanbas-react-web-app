import React , { useState, useEffect }from "react";
import "./index.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { addAssignment, updateAssignment, selectAssignment } from '../assignmentsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {KanbasState} from "../../../store";
import * as client from "./../client";



function AssignmentEditor() {
    const { assignmentId } = useParams();
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const assignments = useSelector((state: KanbasState) =>
        state.assignmentsReducer.assignments);


    interface Assignment {
        _id: string;
        title: string;
        description: string;
        points: number;
        dueDate: string;
        availableFromDate: string;
        availableUntilDate: string;
        course: string | undefined;
    }

    const selectedAssignment = assignments.find(
        (assignment: Assignment) => assignment._id === assignmentId
    );


    const [assignment, setAssignment] = useState({
        _id: "",
        title: "",
        description: "",
        points: 0,
        dueDate: "",
        availableFromDate: "",
        availableUntilDate: "",
        course: courseId,
    });

    useEffect(() => {
        if (assignmentId) {
            const selectedAssignment = assignments.find(
                (assignment) => assignment._id === assignmentId
            );
            if (selectedAssignment) {
                setAssignment(selectedAssignment);
            } else {
                setAssignment({
                    _id: "",
                    title: "",
                    description: "",
                    points: 0,
                    dueDate: "",
                    availableFromDate: "",
                    availableUntilDate: "",
                    course: courseId,
                });
            }
        }
    }, [assignmentId, assignments, courseId]);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setAssignment({ ...assignment, [e.target.name]: e.target.value });
    };



    const handleSave = async () => {
        console.log('Save button clicked');
        try {
            if (selectedAssignment) {
                const updatedAssignment = await client.updateAssignment({ ...assignment, course: courseId! });
                dispatch(updateAssignment(updatedAssignment));
            } else {
                const newAssignment = {
                    ...assignment,
                    _id: new Date().getTime().toString(),
                    course: courseId!,
                };
                const addedAssignment = await client.createAssignment(courseId, newAssignment);
                dispatch(addAssignment(addedAssignment));
            }
            navigate(`/Kanbas/Courses/${courseId}/Assignments`);
        } catch (error) {
            console.error('Error saving assignment:', error);
        }
    };




    return (
        <div style={{marginTop: "40px"}}>
             <span className="float-end" >
                 <FaCheckCircle className="text-success" /> Published
                <button className="edit-button">
                     <FaEllipsisV className="ms-2" />
                </button>
            </span>
            <br/><hr/>
            <h5 style={{marginTop: "20px"}}>Assignment Name</h5>
            <input
                name="title"
                value={assignment.title}
                onChange={handleChange}
                className="form-control mb-2"
            />
            <h6>Description</h6>
            <textarea
                name="description"
                value={assignment.description}
                onChange={handleChange}
                className="form-control mb-2"
            />
            <table className="form-table">
                <tr>
                    <td><label>Points</label></td>
                    <td>  <input
                        name="points"
                        type="number"
                        value={assignment.points}
                        onChange={handleChange}
                        className="form-control mb-2"
                    /></td>
                </tr>
                <tr>
                    <td><label>Assign</label></td>
                    <td>
                        <div className="form-container">

                            <div className="form-row">
                                <label>Due Date</label>
                                <input
                                    name="dueDate"
                                    type="date"
                                    value={assignment.dueDate}
                                    onChange={handleChange}
                                    className="form-control mb-2"
                                />
                            </div>
                            <div className="form-row double">
                                <div>
                                    <label>Available from</label>
                                    <input
                                        name="availableFromDate"
                                        type="date"
                                        value={assignment.availableFromDate}
                                        onChange={handleChange}
                                        className="form-control mb-2"
                                    />
                                </div>
                                <div>
                                    <label>Until</label>
                                    <input
                                        name="availableUntilDate"
                                        type="date"
                                        value={assignment.availableUntilDate}
                                        onChange={handleChange}
                                        className="form-control mb-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>

            </table>


            <button onClick={handleSave} className="btn btn-success ms-2 float-end">
                Save
            </button>
            <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
                  className="btn btn-danger float-end">
                Cancel
            </Link> <br/> <hr/>
        </div>
    );
}
export default AssignmentEditor;