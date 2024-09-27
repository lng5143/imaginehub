import { useAtom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

const currentModel = atomWithStorage("ib-current-model", "dall-e-3");

export const useCurrentModel = () => {
    return useAtom(currentModel);
}