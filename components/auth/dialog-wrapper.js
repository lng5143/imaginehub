import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";

export default function DialogWrapper({ children, headerLabel, triggerLabel }) {
    return (
        <Dialog>
            <DialogTrigger>
                {triggerLabel}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    {headerLabel}
                </DialogHeader>
                {children}
            </DialogContent>
            <DialogFooter>
            </DialogFooter>
        </Dialog>
    )
}