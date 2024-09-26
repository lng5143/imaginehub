import { atom, useAtom } from "jotai";

const currentModel = atom("dall-e-3");

export const useCurrentModel = () => {
    return useAtom(currentModel);
}