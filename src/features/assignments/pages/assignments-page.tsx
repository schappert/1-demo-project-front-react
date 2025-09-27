import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, removeAssignment, clearAssignments } from "../assignments.slice";
import { useSaveAssignments } from "../assignments.service";
import {useUsers} from "../../users/users.service";
import {useTasks} from "../../tasks/tasks.service";
import type {RootState} from "../../../app/store";


export const AssignmentsPage = () => {
    const { data: users } = useUsers();
    const { data: tasks } = useTasks();
    const dispatch = useDispatch();
    const assignments = useSelector((state: RootState) => state.assignments.selected);

    const saveAssignments = useSaveAssignments();

    useEffect(() => {
        console.log("Assignments en cours :", assignments);
    }, [assignments]);

    const handleToggleAssignment = (userId: number, taskId: number) => {
        const exists = assignments.find(a => a.userId === userId && a.taskId === taskId);
        if (exists) {
            dispatch(removeAssignment({ userId, taskId }));
        } else {
            dispatch(addAssignment({ userId, taskId }));
        }
    };

    const handleSave = () => {
        if (assignments.length === 0) {
            alert("Aucune attribution à sauvegarder");
            return;
        }
        saveAssignments.mutate(assignments, {
            onSuccess: () => dispatch(clearAssignments()),
        });
    };

    if (!users || !tasks) return <div className="p-4">Chargement...</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Assignments Page</h1>

            <button
                onClick={handleSave}
                className="px-4 py-2 mb-4 bg-green-600/90 text-white rounded-xl shadow-lg hover:bg-green-700 transition duration-300"
            >
                💾 Sauvegarder les attributions
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {users.map(user => (
                    <div key={user.id} className="p-4 bg-white rounded-xl shadow">
                        <h2 className="font-semibold mb-2">{user.name}</h2>
                        <ul className="space-y-1">
                            {tasks.map(task => {
                                const assigned = assignments.some(a => a.userId === user.id && a.taskId === task.id);
                                return (
                                    <li key={task.id} className="flex justify-between items-center">
                                        <span>{task.title}</span>
                                        <input
                                            type="checkbox"
                                            checked={assigned}
                                            onChange={() => handleToggleAssignment(user.id, task.id)}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};
