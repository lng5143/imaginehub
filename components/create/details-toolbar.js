import { downloadImages } from "@/lib/downloads";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Download, Trash2, CircleX } from "lucide-react";

export default function DetailsToolbar({ handleClose, imageUrls, genId }) {
  const [isPending, startTransition] = useTransition();

  const handleDownloadImages = async () => {
    startTransition(async () => {
        const res = await downloadImages(imageUrls, genId);
        if (!res.success) {
            toast.error(res.message);
        }
    });
  };

  return (
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
  );
}
