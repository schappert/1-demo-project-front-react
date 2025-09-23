import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client";
import type {CreateUserPayload, UpdateUserPayload, User} from "./users.types";

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
    const { id, ...data } = payload;
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
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation<User, unknown, UpdateUserPayload>({
        mutationFn: updateUserApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation<number, unknown, number>({
        mutationFn: deleteUserApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
};
