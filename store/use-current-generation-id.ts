import { useAtom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

const currentGenerationId = atomWithStorage<string | undefined>("ib-current-generation-id", undefined);

export const useCurrentGenerationId = () => {
    return useAtom(currentGenerationId);
}