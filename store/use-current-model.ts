import { Model } from "@prisma/client";
import { useAtom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

const currentModel = atomWithStorage<Model>("ib-current-model", Model.STABLE_DIFFUSION_3_LARGE);

export const useCurrentModel = () => {
    return useAtom(currentModel);
}