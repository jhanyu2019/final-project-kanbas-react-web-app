import { createSlice } from "@reduxjs/toolkit";

import {PayloadAction} from "@reduxjs/toolkit"


interface assignment{
    _id: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    availableFromDate: string;
    availableUntilDate: string;
    course: string;
}

const initialState = {
    assignments: [] as assignment[],
    assignment: { name: "New Assignment", description: "New Description", points: '', dueDate: '', availableFromDate: '', availableUntilDate: '' },
};

const assignmentsSlice = createSlice({
    name: 'assignments',
    initialState,
    reducers: {

        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },

        addAssignment: (state, action) => {
            state.assignments = [
                {...action.payload, _id: new Date().getTime().toString()},
                ...state.assignments,
            ];
        },

        deleteAssignment: (state, action: PayloadAction<string>) => {
            console.log("DELETE_ASSIGNMENT action received", action);
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
            console.log("Updated state", state.assignments);
        },


        updateAssignment: (state,action) => {
            state.assignments = state.assignments.map((assignment) => {
                if(assignment._id === action.payload._id) {
                    return action.payload;
                } else {
                    return assignment;
                }
            });
        },

        selectAssignment: (state, action) => {
            state.assignment = action.payload;
        },

    }
    }
)
export const { addAssignment, deleteAssignment, updateAssignment, setAssignments, selectAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;