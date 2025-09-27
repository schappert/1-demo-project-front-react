import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
            {/* Lien Accueil à gauche */}
            <div>
                <NavLink to="/" className="text-lg font-semibold hover:underline">
                    Accueil
                </NavLink>
            </div>

            {/* Autres liens à droite */}
            <div className="flex space-x-4">
                <NavLink to="/users" className="hover:underline">
                    Users
                </NavLink>
                <NavLink to="/tasks" className="hover:underline">
                    Tasks
                </NavLink>
                <NavLink to="/assignments" className="hover:underline">
                    Assignments
                </NavLink>
            </div>
        </nav>
    );
};
