import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/users.slice.ts";
import tasksReducer from "../features/tasks/tasks.slice.ts";
import assignmentsReducer from "../features/assignments/assignments.slice.ts";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        tasks: tasksReducer,
        assignments: assignmentsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
