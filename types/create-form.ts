import { CreateOrEditImageGenerationDTO } from "./image-generation";

export interface CreateFormProps {
    onSubmit: (data: CreateOrEditImageGenerationDTO) => void;
    isSubmitting: boolean;
}