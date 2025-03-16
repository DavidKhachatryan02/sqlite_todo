export enum KEYS {
  AUTH_TOKEN = "auth_token",
}

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
};

export const NAV_LINKS = [
  { label: "Home", path: ROUTES.HOME },
  { label: "Login", path: ROUTES.LOGIN },
  { label: "Register", path: ROUTES.REGISTER },
];

export const API_URL = import.meta.env.VITE_API_URL;

export const API_ROUTES = {
  TASKS: {
    GET_ALL: "/tasks",
    GET_BY_ID: "/tasks",
    CREATE: "/tasks",
    UPDATE: "/tasks",
    DELETE: "/tasks",
    ADD_SUBTASK: "/tasks",
  },
} as const;

export const enum API_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
};

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export enum TOAST_VARIANTS {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "INFO",
}
