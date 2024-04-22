import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import exp from "constants";

const BASE_API = process.env.REACT_APP_BASE_API_URL;
const COURSES_API = `${BASE_API}/api/courses`;

function Questions() {
    const navigate = useNavigate();
    const { courseId, quizId } = useParams();

    return (
        <div>
            <h2>Questions</h2>
            <button onClick={() => navigate(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions/new/multiple-choice`)}>+ New Multiple Choice Question</button>
            <button onClick={() => navigate(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions/new/true-false`)}>+ New True/False Question</button>
            <button onClick={() => navigate(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions/new/fill-in-blanks`)}>+ New Fill in the Blanks Question</button>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="notify-changes" name="notify-changes" />
                <label className="form-check-label" htmlFor="notify-changes">
                    Notify users that this content has changed
                </label>
            </div>
            <button>Cancel</button>
            <button>Save & Publish</button>
            <button className="btn btn-danger">Save</button>
        </div>
    );
}

export default Questions;
