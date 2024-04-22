import { assignments, enrollments, grades, users } from "../../Database";
import {Link, useParams} from "react-router-dom";
import {FaCog, FaFilter, FaSearch, FaKeyboard, FaDownload, FaUpload,} from 'react-icons/fa';
import "./index.css";
import React from "react";

function Grades() {
    const { courseId } = useParams();
    const as = assignments.filter((assignment) => assignment.course === courseId);
    const es = enrollments.filter((enrollment) => enrollment.course === courseId);

    return (
        <div>

            <div className="flex-fill" style={{marginTop: "40px"}}>

                <div className="d-flex justify-content-between btn-custom-sm">

                    <div>
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                                style={{ backgroundColor: 'transparent', color: 'red', border:'none', marginBottom:'10px' }}>
                            Gradebook <FaKeyboard style={{ color: 'red' }} />
                        </button>

                    </div>


                    <div className="d-flex">
                        <button type="button" className="btn btn-secondary custom-import-btn">
                            <FaDownload /> Import
                        </button>
                        <button type="button" className="btn btn-secondary custom-export-btn">
                            <FaUpload /> Export
                        </button>
                        <button type="button" className="btn btn-secondary custom-setting-btn">
                            <FaCog />
                        </button>
                    </div>
                </div>

            <div className="select-container">
                <div className="select-box">
                    <h6>Student Names</h6>
                    <div className="input-icons mb-3">
                        <FaSearch className="icon" />
                        <select className="form-select">
                            <option selected>Search Students</option>
                            {users.filter(student =>
                                enrollments.some(enrollment =>
                                    enrollment.user === student._id && enrollment.course === courseId)
                            ).map(filteredStudent => (
                                <option key={filteredStudent._id} value={filteredStudent._id}>
                                    {filteredStudent.firstName} {filteredStudent.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="select-box">
                    <h6>Assignment Names</h6>
                    <div className="input-icons mb-3">
                        <FaSearch className="icon" />
                        <select className="form-select">
                            <option selected>Search Assignments</option>
                            {as.map((assignment, index) => (
                                <option key={assignment._id} value={assignment._id}>
                                    {assignment.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

                <div className="row">
                    <button type="button" className="btn btn-secondary custom-apply-filter-btn">
                        <FaFilter /> Apply Filters
                    </button>
                </div><br/>


            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Student Name</th>
                        {as.map((assignment) => (<th key={assignment._id}>{assignment.title}</th>))}
                    </tr>
                    </thead>
                    <tbody>
                    {es.map((enrollment) => {
                        const user = users.find((user) => user._id === enrollment.user);
                        return (
                            <tr key={enrollment._id}>
                                <td>{user?.firstName} {user?.lastName}</td>
                                {as.map((assignment) => {
                                    const grade = grades.find(
                                        (grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                                    return (<td key={assignment._id}>{grade?.grade || "N/A"}</td>);
                                })}
                            </tr>);
                    })}
                    </tbody></table>
            </div>
            </div></div>);
}
export default Grades;
