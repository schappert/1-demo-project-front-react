import React, { useEffect } from "react";
import {
    useTasks,
    useCreateTask,
    useUpdateTask,
    useDeleteTask,
} from "../tasks.service.ts";

export const TasksPage = () => {
    const { data: tasks, isLoading, error } = useTasks();
    const createTask = useCreateTask();
    const updateTask = useUpdateTask();
    const deleteTask = useDeleteTask();

    useEffect(() => {
        if (tasks) console.log("Liste des tâches :", tasks);
    }, [tasks]);

    if (isLoading) return <div className="p-4">Chargement...</div>;
    if (error) return <div className="p-4 text-red-500">Erreur lors du chargement</div>;

    const handleAdd = () => {
        const title = window.prompt("Titre de la tâche ?");
        const description = window.prompt("Description (optionnelle) ?");
        if (!title) return;

        createTask.mutate({ title, description: description || undefined });
    };

    const handleUpdate = (id: number) => {
        const title = window.prompt("Nouveau titre ?");
        const description = window.prompt("Nouvelle description ?");
        if (!title && !description) return;

        updateTask.mutate({
            id,
            title: title || undefined,
            description: description || undefined,
        });
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Supprimer cette tâche ?")) {
            deleteTask.mutate(id);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Tasks Page</h1>

            <button
                onClick={handleAdd}
                className="px-4 py-2 mb-4 bg-blue-600/90 text-white rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
            >
                ➕ Ajouter une tâche
            </button>

            <ul className="space-y-3">
                {tasks?.map((task) => (
                    <li
                        key={task.id}
                        className="flex justify-between items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                    >
                        <div>
                            <p className="font-semibold">{task.title}</p>
                            {task.description ? (
                                <p className="text-gray-500 text-sm italic">{task.description}</p>
                            ) : (
                                <span className="text-gray-300 text-sm italic">Pas de description</span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleUpdate(task.id)}
                                className="px-3 py-1 bg-yellow-500/80 text-white rounded-lg hover:bg-yellow-600 transition"
                            >
                                ✏️ Modifier
                            </button>
                            <button
                                onClick={() => handleDelete(task.id)}
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
