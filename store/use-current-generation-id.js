import { useAtom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

const currentGenerationId = atomWithStorage("ib-current-generation-id", null);

export const useCurrentGenerationId = () => {
    return useAtom(currentGenerationId);
}