import { useAtom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

const currentModel = atomWithStorage("ib-current-model", "de-3");

export const useCurrentModel = () => {
    return useAtom(currentModel);
}