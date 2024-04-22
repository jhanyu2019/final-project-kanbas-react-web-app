import React from 'react';
import {FaFileImport, FaBullseye, FaChartBar, FaBullhorn, FaBell, FaExclamationCircle, FaCalendar, FaCloudDownloadAlt
} from 'react-icons/fa';

function CourseStatus() {
    return(
        <div className="flex-grow-0 me-2 d-none d-lg-block" >

            <div className="button-list">
                <button className="btn btn-option">
                    <FaFileImport/> Import Existing Content
                </button>
                <button className="btn btn-option">
                    <FaCloudDownloadAlt/> Import from Commons
                </button>
                <button className="btn btn-option">
                    <FaBullseye/> Choose Home Page
                </button>

                <button className="btn btn-option">
                    <FaChartBar/> View Course Stream
                </button>

                <button className="btn btn-option">
                    <FaBullhorn/> New Announcement
                </button>

                <button className="btn btn-option">
                    <FaChartBar/> New Analytics
                </button>
                <button className="btn btn-option">
                    <FaBell/> View Notifications
                </button>
            </div>

            <div className="flex-grow-0 me-2 d-none d-lg-block" >
                <div className="to-do">
                    <h6>To Do</h6>
                <hr/><div className="item">
                    <div className="content">
                    <div className="title"><FaExclamationCircle style={{color: 'red', marginRight: '5px'}} aria-hidden="true"/>
                    Grade A1 - ENV + HTML
                </div>
                <div className="subtext"> 100 points • Sep 18 at 11:59pm</div>
                <br/></div>
                </div>

                <div className="coming-up">
                        <h6>Coming Up</h6>
                    <hr/>
                    <div className="item">
                        <div className="content">
                            <div className="title"><FaCalendar/> Lecture</div>
                            <div className="subtext">CS4550.12631.202410</div>
                            <div className="date">Sep 11 at 11:45am</div>
                        </div>
                    </div>

                    <div className="item">
                        <div className="content">
                            <div className="title"><FaCalendar/> CS5610 06 SP23 Lecture</div>
                            <div className="subtext">CS4550.12631.202410</div>
                            <div className="date"> Sep 11 at 6pm</div>
                        </div>
                    </div>


                    <div className="item">
                        <div className="content">
                            <div className="title"><FaCalendar/> CS5610 Web Development Summer 1 2023 -
                                LECTURE
                            </div>
                            <div className="subtext">CS4550.12631.202410</div>
                            <div className="date">Sep 11 at 7pm</div>
                        </div>
                    </div>


                    <button className="btn btn-custom-sm coming-up-btn">12 more in the next week...
                    </button>
                </div>
            </div>

            </div>
        </div>
    )
}
export default CourseStatus;
