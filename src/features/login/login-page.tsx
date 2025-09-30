import { useState } from "react";
import { useAuth } from "../../context/auth-context";
import { login as loginApi } from "../../api/client";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await loginApi(username, password);
            login(data.access_token);
            navigate("/dashboard"); // ✅ redirection après login
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

                <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg text-sm">
                    <p className="font-medium">Exemple d'identifiants :</p>
                    <p>
                        <span className="font-semibold">Utilisateur :</span> testuser
                    </p>
                    <p>
                        <span className="font-semibold">Mot de passe :</span> secret
                    </p>
                </div>

                <div>
                    <input
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nom d’utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Mot de passe"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 shadow transition"
                >
                    Se connecter
                </button>
            </form>
        </div>
    );
};
