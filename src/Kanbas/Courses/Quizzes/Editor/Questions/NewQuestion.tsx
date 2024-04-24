import React, { useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TrueOrFalseQuestion from "./TrueOrFalseQuestion";
import FillInBlanksQuestion from "./FillInBlanksQuestion";

function NewQuestion() {
    const navigate = useNavigate();
    const { courseId, quizId } = useParams();
    const [questionType, setQuestionType] = useState('multipleChoice');

    return (
        <div>

            <select
                className="new-question-select"
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                style={{marginTop: '35px'}}
            >
                <option value="multipleChoice">Multiple Choice</option>
                <option value="fillInTheBlanks">Fill in the Blanks</option>
                <option value="trueFalse">True/False</option>
            </select>

            {questionType === 'multipleChoice' && <MultipleChoiceQuestion/>}
            {questionType === 'trueFalse' && <TrueOrFalseQuestion/>}
            {questionType === 'fillInTheBlanks' && <FillInBlanksQuestion/>}


        </div>
    );
}
export default NewQuestion;