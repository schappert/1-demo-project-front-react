import { createSlice } from "@reduxjs/toolkit";

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

interface TasksState {
    list: Task[];
}

const initialState: TasksState = {
    list: [],
};

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask(state, action: { payload: Task }) {
            state.list.push(action.payload);
        },
        toggleTask(state, action: { payload: string }) {
            const task = state.list.find(t => t.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
    },
});

export const { addTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;
