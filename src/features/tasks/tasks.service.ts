import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client";
import type {
    Task,
    CreateTaskPayload,
    UpdateTaskPayload,
    Assignment,
    CreateAssignmentPayload,
} from "./tasks.types";

// --- API calls ---
const fetchTasks = async (): Promise<Task[]> => {
    const res = await api.get<Task[]>("/tasks");
    return res.data;
};

const createTaskApi = async (payload: { title: string; description?: string }): Promise<Task> => {
    const res = await api.post<Task>("/tasks", payload);
    return res.data;
};


const updateTaskApi = async (payload: UpdateTaskPayload): Promise<Task> => {
    const { id, ...data } = payload;
    const res = await api.put<Task>(`/tasks/${id}`, data);
    return res.data;
};

const deleteTaskApi = async (id: number): Promise<number> => {
    await api.delete(`/tasks/${id}`);
    return id;
};

// Assignments
const fetchAssignments = async (): Promise<Assignment[]> => {
    const res = await api.get<Assignment[]>("/assignments");
    return res.data;
};

const createAssignmentApi = async (payload: CreateAssignmentPayload): Promise<Assignment> => {
    const res = await api.post<Assignment>("/assignments", payload);
    return res.data;
};

const deleteAssignmentApi = async (id: number): Promise<number> => {
    await api.delete(`/assignments/${id}`);
    return id;
};

// --- Hooks ---
export const useTasks = () =>
    useQuery<Task[]>({
        queryKey: ["tasks"],
        queryFn: fetchTasks,
        staleTime: 1000 * 60,
    });

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation<Task, unknown, CreateTaskPayload>({
        mutationFn: createTaskApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation<Task, unknown, UpdateTaskPayload>({
        mutationFn: updateTaskApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation<number, unknown, number>({
        mutationFn: deleteTaskApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
};

// Assignments
export const useAssignments = () =>
    useQuery<Assignment[]>({
        queryKey: ["assignments"],
        queryFn: fetchAssignments,
        staleTime: 1000 * 60,
    });

export const useCreateAssignment = () => {
    const queryClient = useQueryClient();
    return useMutation<Assignment, unknown, CreateAssignmentPayload>({
        mutationFn: createAssignmentApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["assignments"] }),
    });
};

export const useDeleteAssignment = () => {
    const queryClient = useQueryClient();
    return useMutation<number, unknown, number>({
        mutationFn: deleteAssignmentApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["assignments"] }),
    });
};
