interface ReplicateFLUXPayload {
    input: {
        width?: number;
        height?: number;
        prompt_upsampling?: boolean;
        seed?: number;
        safety_tolerance?: number;
        steps?: number;
        guidance?: number;
        interval?: number;
        output_format: string;
        raw?: boolean;
        prompt: string;
    }
}

interface ReplicateFLUXSuccessResponse {
    id: string;
    model: string;
    version: string;
    input: {
        height: number;
        prompt: string;
        steps: number;
        width: number;
    };
    logs: string;
    output: null;
    data_removed: boolean;
    error: null;
    status: string;
    created_at: string;
    urls: {
        cancel: string;
        get: string;
        stream: string;
    };
}