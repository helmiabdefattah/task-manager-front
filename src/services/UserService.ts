import {toast} from "react-toastify";
import {ApiClient} from "../utils/ApiClient";
import {Task} from "../types/Task";
import {User} from "../types";

const API_URL: string  = process.env.API_URL as string;

interface StoreTaskRequest{
    title:string;
    description?:string;
    assignedTo?:string
}

interface UpdateRequest{
    id:string;
    title?:string;
    status?:string;
    description?:string;
    assignedTo?:string
}

const apiClient = ApiClient(true)

const UserService = {
    getAll: async (): Promise<User[]> => {
        try {
            const response =  await apiClient.get(`/users`);
            if (response.data.status == true){
                return response.data.data;
            }
            return [];
        } catch (error) {
            throw error;
        }
    }

}

export default UserService;
