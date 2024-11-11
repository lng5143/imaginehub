import { useAtom, atom } from "jotai";

const currentPage = atom(1);

export const useCurrentPage = () => {
    return useAtom(currentPage);
}