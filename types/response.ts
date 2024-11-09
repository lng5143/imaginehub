export type ApiResponse<T = any> = {
    success: boolean;
    message?: string;
    data?: T;
}

export class ResponseFactory {
    static success<T>({data, message}: {data?: T, message?: string}) : ApiResponse<T> {
        return { success: true, data, message };
    }

    static fail<T>({message, data}: {message?: string, data?: T}) : ApiResponse<T> {
        return { success: false, data, message };
    }
}