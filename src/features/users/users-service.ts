/*import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";

export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
}

const fetchUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>("/users");
    console.log("Réponse API :", response.data);
    return response.data;
};


export const useUsers = () => {
    return useQuery<User[]>({
        queryKey: ["users"], // clé unique pour ce query
        queryFn: fetchUsers,
        staleTime: 1000 * 60, // 1 minute
        refetchOnWindowFocus: false, // pas de refetch automatique
        //initialData: [], // afin de retourner par défaut un tableau vde
    });
};*/
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client";

// --- Types ---
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password?: string; // optionnel à l'affichage mais requis à la création
}

export type CreateUserPayload = {
    name: string;
    username: string;
    email: string;
    password: string;
};

export type UpdateUserPayload = {
    id: number;
    name?: string;
    email?: string;
    username?: string;
    password?: string;
};

// --- API calls ---
const fetchUsers = async (): Promise<User[]> => {
    const res = await api.get<User[]>("/users");
    return res.data;
};

const createUserApi = async (payload: CreateUserPayload): Promise<User> => {
    const res = await api.post<User>("/users", payload);
    return res.data;
};

const updateUserApi = async (payload: UpdateUserPayload): Promise<User> => {
    const { id, ...data } = payload; // <-- suppression de `id` du body car passé en param
    const res = await api.put<User>(`/users/${id}`, data);
    return res.data;
};

const deleteUserApi = async (id: number): Promise<number> => {
    await api.delete(`/users/${id}`);
    return id;
};

// --- Hooks ---
export const useUsers = () =>
    useQuery<User[]>({
        queryKey: ["users"],
        queryFn: fetchUsers,
        staleTime: 1000 * 60,
    });

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation<User, unknown, CreateUserPayload>({
        mutationFn: createUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation<User, unknown, UpdateUserPayload>({
        mutationFn: updateUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation<number, unknown, number>({
        mutationFn: deleteUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};
