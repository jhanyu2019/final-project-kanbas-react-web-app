import React, { useEffect,useState } from "react";
import axios from "axios";
function WorkingWithObjects() {

    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment"
    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
    };
    const updateTitle = async () => {
        const response = await axios
            .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };
    useEffect(() => {
        fetchAssignment();
    }, []);




    const [module, setModule] = useState({
        id: 5610, name: "Web development",
        description: "Learn about the web development",
        course:"CS5610"
    });
    const MODULE_URL = "http://localhost:4000/a5/module"

    return (
        <div>
            <h3>Working With Objects</h3>
            <h3>Modifying Properties</h3>
            <input onChange={(e) => setAssignment({
                ...assignment, title: e.target.value })}
                   value={assignment.title} type="text" />
            <button onClick={updateTitle} >
                Update Title to: {assignment.title}
            </button>
            <button onClick={fetchAssignment} >
                Fetch Assignment
            </button>




            <h4>Retrieving Objects</h4>
            <a href="http://localhost:4000/a5/assignment">
                Get Assignment
            </a>
            <h4>Retrieving Properties</h4>
            <a href="http://localhost:4000/a5/assignment/title">
                Get Title
            </a>

            <h4>Modifying Properties</h4>
            <a href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input type="text"
                   onChange={(e) => setAssignment({ ...assignment,
                       title: e.target.value })}
                   value={assignment.title}/>

            <h4>Get Assignment's Score</h4>
            <a href="http://localhost:4000/a5/assignment/score">
                Get Score
            </a>
            <h4>Modifying Assignment's Score</h4>
            <a href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <input type="number"
                   onChange={(e) => setAssignment({ ...assignment,
                       score: parseInt(e.target.value)})}
                   value={assignment.score}/>










            <h4>Get Module</h4>
            <a href="http://localhost:4000/a5/module">
                Get Module
            </a>
            <h4>Get Module Name</h4>
            <a href="http://localhost:4000/a5/module/name">
                Get Module Name
            </a>
            <h4>Modifying Module Name</h4>
            <a href={`${MODULE_URL}/name/${module.name}`}>
                Update Name
            </a>
            <input type="text"
                   onChange={(e) => setModule({ ...module,
                       name: e.target.value })}
                   value={module.name}/>


        </div>
    );
}
export default WorkingWithObjects;