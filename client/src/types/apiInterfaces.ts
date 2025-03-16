export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  subtasks: Task[];
  parentId: string | null;
  parent?: Task | null;
  createdAt: string;
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: false;
  error: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string | null;
  status?: TaskStatus;
  parentId?: string | null;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  parentId?: string | null;
}
