import { useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate("/dashboard");
        } catch (err) {
            alert("Erreur login ❌");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 space-y-5"
            >
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    Connexion 🔐
                </h1>
                <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-4 rounded-lg shadow-md">
                    <p className="font-semibold mb-2">Identifiants à saisir</p>
                    <ul className="text-sm space-y-1">
                        <li>
                            <span className="font-medium">Utilisateur :</span> testuser
                        </li>
                        <li>
                            <span className="font-medium">Mot de passe :</span> secret
                        </li>
                    </ul>
                </div>
                <input
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Nom d’utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-blue-600 text-white font-semibold rounded-lg py-2">
                    Se connecter
                </button>
            </form>
        </div>
    );
};
