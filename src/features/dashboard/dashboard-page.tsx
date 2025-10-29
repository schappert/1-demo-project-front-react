import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import {api} from "../../api/client.ts";

type DashboardData = {
    users: number;
    tasks: number;
};

export const DashboardPage = () => {
    const { token } = useAuth();
    const [data, setData] = useState<DashboardData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get("/dashboard"); // cookies envoyés automatiquement via la config axios withCredentials: true
            setData(res.data);
        };
        fetchData();
    }, []);

    if (!data) {
        return (
            <div className="p-6 bg-white shadow-xl rounded-xl">
                <h1 className="text-2xl font-bold mb-4">Dashboard sécurisé</h1>
                <p>Chargement...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-bold mb-4">Dashboard sécurisé</h1>
            <ul className="space-y-2 text-gray-700">
                <li>👤 Utilisateurs : {data.users}</li>
                <li>✅ Tâches : {data.tasks}</li>
            </ul>
        </div>
    );
};
