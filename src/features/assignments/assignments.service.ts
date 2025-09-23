import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client";

export type AssignmentPayload = { userId: number; taskId: number };

export const useSaveAssignments = () => {
    const queryClient = useQueryClient();
    return useMutation<void, unknown, AssignmentPayload[]>({
        mutationFn: async (assignments) => {
            await api.post("/assignments", { assignments });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            queryClient.invalidateQueries(["users"]);
        },
    });
};
