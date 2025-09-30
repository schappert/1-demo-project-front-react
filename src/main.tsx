import * as React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import {AppProviders} from "./app/provider.tsx";
import {AuthProvider} from "./context/auth-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <AppProviders>
                <App />
            </AppProviders>
        </AuthProvider>
    </React.StrictMode>
);
