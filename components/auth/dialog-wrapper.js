import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DialogWrapper({ children, headerLabel, triggerLabel }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>{triggerLabel}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{headerLabel}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
            <DialogFooter>
            </DialogFooter>
        </Dialog>
    )
}