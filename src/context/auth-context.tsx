// src/context/auth-context.tsx
import {createContext, useContext, useEffect, useState} from "react";
import type { ReactNode } from "react";
import { api } from "../api/client";

type AuthContextType = {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // ✅ Check session au démarrage
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await api.get("/auth/me");
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);


    const login = async (username: string, password: string) => {
        await api.post("/auth/login", { username, password });
        setIsAuthenticated(true);
    };


    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
