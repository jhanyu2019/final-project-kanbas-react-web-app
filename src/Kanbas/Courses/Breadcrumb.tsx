import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { courses, assignments } from "../Database";
import {HiMiniBars3} from "react-icons/hi2";
import {FaBook, FaEllipsisV} from "react-icons/fa";

const Breadcrumb = () => {
    const { courseId } = useParams();
    const course = courses.find((course) => course._id === courseId);
    const location = useLocation();
    const allPathnames = location.pathname.split('/').filter(x => x);
    const coursesIndex = allPathnames.findIndex(segment => segment.toLowerCase() === 'courses');
    const pathnames = coursesIndex >= 0 ? allPathnames.slice(coursesIndex + 1) : [];

    const createBreadcrumbLinks = (pathSegments: string[]) => {
        return pathSegments.map((segment: string, index: number) => {
            let displayText = segment;
            if (segment === courseId && course) {
                displayText = `${course.number} ${course.name}`;
            }else {
                const assignment = assignments.find(a => a._id === segment && a.course === courseId);
                if (assignment) {
                    displayText = assignment.title;
                }
            }

            const routeTo = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            const linkStyle = {
                color: isLast ? '#6c757d' : 'red',
                textDecoration: 'none',
                display: 'inline-block',
                marginTop: '10px',
                marginLeft:'10px'
            };

            return (
                <span key={segment} style={{ display: 'inline-block', verticalAlign: 'top' }}>
                    {!isLast ? (
                        <>
                            <Link to={routeTo} style={linkStyle}>{displayText}</Link>
                            <span className="breadcrumb-separator"> {'>'} </span>
                        </>
                    ) : (
                        <span style={linkStyle}>{displayText}</span>
                    )}
                </span>
            );
        });
    };

    const breadcrumbs = createBreadcrumbLinks(pathnames);

    return (
        <div className="breadcrumb-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px'}}>
            <nav aria-label="breadcrumb" style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <ol className="breadcrumb" style={{ display: 'flex', alignItems: 'center' }}>
                    <li className="breadcrumb-item">
                    <Link to="/" style={{
                        color: 'red',
                        marginRight: '5px',
                        marginLeft: '30px',
                        verticalAlign: 'middle',
                        fontSize: '24px'
                    }}>
                        <HiMiniBars3 />
                    </Link>
                </li>
                {breadcrumbs}
            </ol>
                <button className="student-view-button" style={{ marginLeft: 'auto', order: 2 }}>
                <FaBook className="faBook" /> Student View
            </button>
        </nav>
        </div>
    );
};

export default Breadcrumb;