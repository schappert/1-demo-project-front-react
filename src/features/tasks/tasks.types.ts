import type {User} from "../users/users.types.ts";

export interface Task {
    id: number;
    title: string;
    description?: string;
    assignments?: Assignment[];
}

export interface Assignment {
    id: number;
    taskId: number;
    userId: number;
    task?: Task;
    user?: User;
}

export type CreateTaskPayload = {
    title: string;
    description?: string;
};

export type UpdateTaskPayload = {
    id: number;
    title?: string;
    description?: string;
};

export type CreateAssignmentPayload = {
    taskId: number;
    userId: number;
};

export type UpdateAssignmentPayload = {
    id: number;
    taskId?: number;
    userId?: number;
};
