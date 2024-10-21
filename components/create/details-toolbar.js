'use client'

import { downloadImages } from "@/lib/downloads";
import { useTransition, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Download, Trash2, CircleX } from "lucide-react";
import ConfirmDialog from "../confirm-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentPage } from "@/store/use-current-page";
import { useCurrentGenerationId } from "@/store/use-current-generation-id";
import { deleteGeneration } from "@/server/actions/generations";

export default function DetailsToolbar({ handleClose, imageUrls, genId }) {
    const queryClient = useQueryClient();
    const [isPending, startTransition] = useTransition();
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [currentPage, _setCurrentPage] = useCurrentPage();
    const [currentGenerationId, _setCurrentGenerationId] = useCurrentGenerationId();

    const handleDownloadImages = async () => {
        startTransition(async () => {
            const res = await downloadImages(imageUrls, genId);
            if (!res.success) {
                toast.error(res.message);
            }
        });
    };

    const handleDeleteOptimisticUpdate = async () => {
        queryClient.setQueryData(["generations", currentPage], (old) => {
            if (!old) return;

            const deletedItem = old.data.find(item => item.id === currentGenerationId);
            if (deletedItem) {
                const newData = old.data.filter(item => item.id !== deletedItem.id);
                return { ...old, data: newData };
            }

            return old;
        });

        queryClient.invalidateQueries({ queryKey: ["generations", currentPage] });

        handleClose();
    }

    const handleDelete = async () => {
        const res = await deleteGeneration(currentGenerationId);
        if (res.success) {
            handleDeleteOptimisticUpdate();
        }
    }

    return (
        <>
            <ConfirmDialog
                open={isDeleteConfirmOpen}
                setOpen={setIsDeleteConfirmOpen}
                title="You are about to delete this generation"
                message="This action cannot be undone"
                confirmFn={handleDelete}
            />
            <div className="px-3 py-2 pb-0 flex items-center justify-end gap-2">
                <Button
                    variant="outline"
                    className="text-sm hover:bg-amber-500 hover:scale-105 hover:border-none transition-all duration-300"
                    onClick={() => setIsDeleteConfirmOpen(true)}
                >
                    <Trash2 className="size-4 text-black" />
                </Button>
                <Button
                    variant="outline"
                    className="text-sm hover:bg-amber-500 hover:scale-105 hover:border-none transition-all duration-300"
                    onClick={handleDownloadImages}
                    disabled={isPending}
                >
                    <Download className="size-4 text-black" />
                </Button>
                <div className="flex-grow" />
                <CircleX
                    className="size-4 text-black hover:cursor-pointer"
                    onClick={handleClose}
                />
            </div>
        </>
    );
}
