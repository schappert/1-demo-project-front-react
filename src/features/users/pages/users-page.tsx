import { useEffect } from "react";
import {
    useUsers,
    useCreateUser,
    useUpdateUser,
    useDeleteUser,
} from "../users.service.ts";

export const UsersPage = () => {
    const { data: users, isLoading, error } = useUsers();
    const createUser = useCreateUser();
    const updateUser = useUpdateUser();
    const deleteUser = useDeleteUser();

    useEffect(() => {
        if (users) console.log("Liste des utilisateurs :", users);
    }, [users]);

    if (isLoading) return <div className="p-4">Chargement...</div>;
    if (error) return <div className="p-4 text-red-500">Erreur lors du chargement</div>;

    const handleAdd = () => {
        const name = window.prompt("Nom ?");
        const username = window.prompt("Username ?");
        const email = window.prompt("Email ?");
        const password = window.prompt("Mot de passe ?");
        if (!name || !username || !email || !password) return;

        createUser.mutate({ name, username, email, password });
    };

    const handleUpdate = (id: number) => {
        const name = window.prompt("Nouveau nom ?");
        const username = window.prompt("Nouveau username ?");
        const email = window.prompt("Nouvel email ?");
        if (!name && !username && !email) return;

        updateUser.mutate({
            id,
            name: name || undefined,
            username: username || undefined,
            email: email || undefined,
        });
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Supprimer cet utilisateur ?")) {
            deleteUser.mutate(id);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Users Page</h1>

            <button
                onClick={handleAdd}
                className="px-4 py-2 mb-4 bg-blue-600/90 text-white rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
            >
                ➕ Ajouter un utilisateur
            </button>

            <ul className="space-y-3">
                {users?.map((user) => (
                    <li
                        key={user.id}
                        className="flex justify-between items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                    >
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-gray-500">{user.email}</p>
                            <p className="text-gray-400 text-sm italic">
                                {user.username}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleUpdate(user.id)}
                                className="px-3 py-1 bg-yellow-500/80 text-white rounded-lg hover:bg-yellow-600 transition"
                            >
                                ✏️ Modifier
                            </button>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="px-3 py-1 bg-red-600/80 text-white rounded-lg hover:bg-red-700 transition"
                            >
                                🗑 Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
