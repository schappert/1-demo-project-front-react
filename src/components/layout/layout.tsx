import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";

export const Layout = () => {
    return (
        <div>
            <Navbar />
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    );
};
