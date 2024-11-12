import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";

interface DialogWrapperProps {
    headerLabel: string;
    triggerLabel: string;
    children: React.ReactNode;
}

export default function DialogWrapper({ children, headerLabel, triggerLabel } : DialogWrapperProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button >{triggerLabel}</Button>
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