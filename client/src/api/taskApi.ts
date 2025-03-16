import { API_METHODS, API_ROUTES } from "../utils/constants";
import { ApiClient } from "./config";
import {
    ApiResponse,
    Task,
    CreateTaskRequest,
    UpdateTaskRequest,
} from "../types/apiInterfaces";

export class TaskApiService {
    static async getAll() {
      const response = await ApiClient.request<ApiResponse<Task[]>>(
        API_METHODS.GET,
        API_ROUTES.TASKS.GET_ALL
      );
      return response.data;
    }
  
    static async getById(id: string) {
      const response = await ApiClient.request<ApiResponse<Task>>(
        API_METHODS.GET,
        `${API_ROUTES.TASKS.GET_BY_ID}/${id}`
      );
      return response.data;
    }
  
    static async create(body: CreateTaskRequest) {
      const response = await ApiClient.request<ApiResponse<Task>>(
        API_METHODS.POST,
        API_ROUTES.TASKS.CREATE,
        body
      );
      return response.data;
    }
  
    static async update(id: string, body: UpdateTaskRequest) {
      const response = await ApiClient.request<ApiResponse<Task>>(
        API_METHODS.PUT,
        `${API_ROUTES.TASKS.UPDATE}/${id}`,
        body
      );
      return response.data;
    }
  
    static async delete(id: string) {
      const response = await ApiClient.request<ApiResponse<unknown>>(
        API_METHODS.DELETE,
        `${API_ROUTES.TASKS.DELETE}/${id}`
      );
      return response.data;
    }
  
    static async addSubtask(id: string, body: CreateTaskRequest) {
      const response = await ApiClient.request<ApiResponse<Task>>(
        API_METHODS.POST,
        `${API_ROUTES.TASKS.ADD_SUBTASK}/${id}/subtasks`,
        body
      );
      return response.data;
    }
  }