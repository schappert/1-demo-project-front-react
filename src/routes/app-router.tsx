import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../components/layout/layout";
import { UsersPage } from "../features/users/pages/users-page";
import { TasksPage } from "../features/tasks/pages/tasks-page";
import { AssignmentsPage } from "../features/assignments/pages/assignments-page";
import {HomePage} from "../features/home/home-page.tsx";

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/assignments" element={<AssignmentsPage />} />
            </Route>
        </Routes>
    );
};
