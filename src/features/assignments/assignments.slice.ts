import { createSlice } from "@reduxjs/toolkit";

interface Assignment {
    userId: number;
    taskId: number;
}

interface AssignmentsState {
    selected: Assignment[];
}

type PayloadAction<T> = { payload: T };

const initialState: AssignmentsState = { selected: [] };

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action: PayloadAction<Assignment>) => {
            state.selected.push(action.payload);
        },
        removeAssignment: (state, action: PayloadAction<Assignment>) => {
            state.selected = state.selected.filter(
                a => !(a.userId === action.payload.userId && a.taskId === action.payload.taskId)
            );
        },
        clearAssignments: state => {
            state.selected = [];
        },
    },
});

export const { addAssignment, removeAssignment, clearAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
