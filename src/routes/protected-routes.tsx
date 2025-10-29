import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import type { JSX } from "react";

export const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
};

