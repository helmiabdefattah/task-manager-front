import {User} from "./user";

export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: string;
    createdAt: string;
    assignedTo?: User;
}
