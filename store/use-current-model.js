import { useAtom } from "jotai";
import { atomWithStorage } from 'jotai/utils'
import { MODELS } from "@/const/imagine-box-consts";

const currentModel = atomWithStorage("ib-current-model", MODELS[0]);

export const useCurrentModel = () => {
    return useAtom(currentModel);
}