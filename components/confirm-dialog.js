import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export default function ConfirmDialog({ open, setOpen, title, message, confirmFn }) {

    const [isPending, startTransition] = useTransition();

    const handleConfirm = () => {
        startTransition(async () => {
            await confirmFn();
            setOpen(false);
        })
    }

    return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white text-black">
            <DialogHeader>
                <DialogTitle className="leading-6">{title}</DialogTitle>
                <DialogDescription className="text-gray-800">{message}</DialogDescription>
            </DialogHeader>
            <DialogFooter className="pt-2">
                <Button variant="ibLight" onClick={() => setOpen(false)} disabled={isPending}>Cancel</Button>
                <Button variant="ibDark" onClick={handleConfirm} disabled={isPending}>Confirm</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
}