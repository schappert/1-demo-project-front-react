import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/users-slice";
import tasksReducer from "../features/tasks/tasks-slice";
import assignmentsReducer from "../features/assignments/assignments-slice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        tasks: tasksReducer,
        assignments: assignmentsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
