import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4 flex space-x-4">
            <NavLink to="/users" className="hover:underline">
                Users
            </NavLink>
            <NavLink to="/tasks" className="hover:underline">
                Tasks
            </NavLink>
            <NavLink to="/assignments" className="hover:underline">
                Assignments
            </NavLink>
        </nav>
    );
};
