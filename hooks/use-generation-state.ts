import { LSConsts } from "@/const/consts";
import { Provider } from "@prisma/client";

interface GenerationState {
    id: string;
    status: 'PROCESSING' | 'UPLOADING' | 'COMPLETED' | 'FAILED';
    provider: Provider;
    prompt: string;
    startedAt: number;
}

export const useGenerationState = () => {

    const savePendingGenerations = ( state: GenerationState, images: Blob[] ) => {
        const pending = JSON.parse(localStorage.getItem(LSConsts.PENDING_GENERATIONS) || '[]');
        localStorage.setItem(LSConsts.PENDING_GENERATIONS, JSON.stringify([...pending, state ]));

        // TODO: save images to indexDB 
    }

    const removePendingGeneration = ( id: string ) => {
        const pending = JSON.parse(localStorage.getItem(LSConsts.PENDING_GENERATIONS) || '[]');
        localStorage.setItem(LSConsts.PENDING_GENERATIONS, JSON.stringify(pending.filter((gen: GenerationState) => gen.id !== id)));

        // TODO: remove images from indexDB
    }

    return { savePendingGenerations, removePendingGeneration };
}