import { createSlice } from "@reduxjs/toolkit";

interface Assignment {
    id: string;
    userId: string;
    taskId: string;
}

interface AssignmentsState {
    list: Assignment[];
}

const initialState: AssignmentsState = {
    list: [],
};

export const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment(state, action: { payload: Assignment }) {
            state.list.push(action.payload);
        },
        removeAssignment(state, action: { payload: string }) {
            state.list = state.list.filter(a => a.id !== action.payload);
        },
    },
});

export const { addAssignment, removeAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
