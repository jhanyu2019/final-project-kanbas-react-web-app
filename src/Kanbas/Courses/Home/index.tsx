import ModuleList from "../Modules/List";
import React from 'react';
import CourseStatus from "./CourseStatus";
import "./index.css";
function Home() {
    return (
        <div className="home-container">
            <div className="flex-fill module-list-container">
                <ModuleList />
            </div>
            <div className="course-status-container">
                <CourseStatus/>
            </div>

        </div>
    );
}
export default Home;