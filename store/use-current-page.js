import { useAtom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

const currentPage = atomWithStorage("ib-current-page", 1);

export const useCurrentPage = () => {
    return useAtom(currentPage);
}