import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";

export default function DialogWrapper({ children, headerLabel, triggerLabel }) {
    return (
        <Dialog>
            <DialogTrigger>
                {triggerLabel}
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