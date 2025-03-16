import { AxiosError } from "axios";
import { EnqueueSnackbar } from "notistack";
import axiosInstance from "./axios";
import { API_METHODS, TOAST_VARIANTS } from "../../utils/constants";

interface ApiErrorResponse {
    success?: boolean;
    error?: string;
    message?: string;
}

export class ApiClient {
    private static toastContainer: EnqueueSnackbar | null = null;

    static initializeSnackbar(enqueue: EnqueueSnackbar) {
        this.toastContainer = enqueue;
    }

    static async request<T>(method: API_METHODS, url: string, data?: unknown): Promise<T> {
        try {
            const response = await axiosInstance.request<T>({ method, url, data });
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    private static handleError(error: unknown): void {
        let message = "An unexpected error occurred";
        let variant: TOAST_VARIANTS = TOAST_VARIANTS.ERROR;

        if (error instanceof AxiosError) {

            const responseData = error.response?.data as ApiErrorResponse | undefined;
            message = responseData?.error || error.response?.data?.message || error.message;

            switch (error.response?.status) {
                case 400:
                    message = message || "Bad request";
                    variant = TOAST_VARIANTS.ERROR
                    break;
                case 401:
                    message = message || "Unauthorized, please log in again";
                    variant = TOAST_VARIANTS.WARNING
                    break;
                case 404:
                    message = message || "Resource not found";
                    variant = TOAST_VARIANTS.ERROR
                    break;
                case 409:
                    message = message || "Conflict occurred";
                    variant = TOAST_VARIANTS.WARNING
                    break;
                case 500:
                    message = message || "Internal server error";
                    variant = TOAST_VARIANTS.ERROR
                    break;
                default:
                    message = message || "API error occurred";
            }
        } else {
            console.error("Unexpected Error:", error);
        }
        if (this.toastContainer) {
            this.toastContainer(message, { variant, autoHideDuration: 3000  });
        } else {
            console.error("Snackbar not initialized:", message);
        }
    }
}