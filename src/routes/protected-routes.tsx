import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import {JSX} from "react";

export const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();
    if (!token) return <Navigate to="/login" replace />;
    return children;
};
