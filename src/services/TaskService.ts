import {toast} from "react-toastify";
import {ApiClient} from "../utils/ApiClient";
import {Task} from "../types/Task";
import {Filter} from "../components/tasks/TasksBoard";
import {AxiosError, AxiosInstance, AxiosResponse} from "axios";

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

const apiClient:AxiosInstance = ApiClient(true);

const TaskService = {
    store : async (taskRequest:StoreTaskRequest): Promise<boolean> => {

        try {
            const response =  await apiClient.post(`/tasks`,taskRequest);
            if (response.data.status == true){
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    },

    getAll: async (type:string,params:Filter): Promise<Task[]> => {
        let searchQuery = `status=${type}`;
        if (params) {
            searchQuery += `&search=${params}`;
        }
        try {
            const response =  await apiClient.get(`/tasks?${searchQuery}`);
            if (response.data.status == true){
                return response.data.data;
            }
            return [];
        } catch (error) {
            throw error;
        }
    },
    search: async (type:string,params:Filter): Promise<Task[]> => {
        let searchQuery = `status=${type}`;
        // if (params) {
        //     searchQuery += `&search=${params}`;
        // }
        try {
            const response =  await apiClient.post(`/tasks-search?${searchQuery}`,params);
            if (response.data.status == true){
                return response.data.data;
            }
            return [];
        } catch (error) {
            throw error;
        }
    },

    getTaskById: async (id:string): Promise<Task | null> => {
        try {
            const response =  await apiClient.get(`/tasks/${id}`);
            if (response.data.status == true){
                return response.data.data;
            }
            return null;
        } catch (error) {
            throw error;
        }
    },

    update : async (taskRequest:UpdateRequest): Promise<boolean> => {
        // console.log(taskRequest)
        try {
            const response =  await apiClient.put(`/tasks/${taskRequest.id}`,taskRequest);
            if (response.data.status == true){

                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    },

    assign : async (userId:string,taskId:string): Promise<boolean> => {

        try {
            const response =  await apiClient.post(`/tasks/${taskId}/${userId}`);
            if (response.data.status == true){
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    },
    deleteTask: async (id:string): Promise<string | boolean> => {
        let response:AxiosResponse<any, any>;
        try {
            response =  await apiClient.delete(`/tasks/${id}`);
            if (response.data.status == true){
                toast.success('Task Deleted Successfully')
                return response.data.message;
            }
            toast.error('Something Went Wrong')
            return false;
        } catch (error) {
            toast.error('Not Authorized')
            return  false;
        }
    },



    getColumns: async (): Promise<string[]> => {
        try {
            const response =  await apiClient.get(`/task-types`);
            if (response.data.status == true){
                return response.data.data;
            }
            return [];
        } catch (error) {
            throw error;
        }
    }

}

export default TaskService;
