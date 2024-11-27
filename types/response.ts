import { ERROR_TYPES } from "@/const/consts";

export type ApiResponse<T = any> = {
    success: boolean;
    message?: string;
    errorType?: ERROR_TYPES;
    data?: T;
}

export class ResponseFactory {
    static success<T>({data, message}: {data?: T, message?: string}) : ApiResponse<T> {
        return { success: true, data, message };
    }

    static fail<T>({message, data, errorType }: {message?: string, data?: T, errorType?: ERROR_TYPES}) : ApiResponse<T> {
        return { success: false, data, message, errorType };
    }
}