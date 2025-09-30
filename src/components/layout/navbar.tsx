import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export const Navbar = () => {
    const { token, logout } = useAuth();

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
            {/* Lien Accueil à gauche */}
            <div>
                <NavLink to="/" className="text-lg font-semibold hover:underline">
                    Accueil
                </NavLink>
            </div>

            {/* Liens à droite */}
            <div className="flex space-x-4 items-center">
                <NavLink to="/users" className="hover:underline">
                    Users
                </NavLink>
                <NavLink to="/tasks" className="hover:underline">
                    Tasks
                </NavLink>
                <NavLink to="/assignments" className="hover:underline">
                    Assignments
                </NavLink>

                {token ? (
                    <>
                        {/* Dashboard visible uniquement si connecté */}
                        <NavLink to="/dashboard" className="hover:underline font-bold">
                            Dashboard
                        </NavLink>
                        {/* Bouton logout */}
                        <button
                            onClick={logout}
                            className="ml-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                        >
                            Déconnexion
                        </button>
                    </>
                ) : (
                    /* Lien login visible si non connecté */
                    <NavLink to="/login" className="hover:underline font-bold">
                        Se connecter
                    </NavLink>
                )}
            </div>
        </nav>
    );
};
