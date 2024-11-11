import { useCurrentModel } from "@/store/use-current-model";
import { MODELS} from "@/const/consts";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function ModelSelector() {
    const [currentModel, setCurrentModel] = useCurrentModel();
    const [open, setOpen] = useState(false);

    const handleSelectModel = (model: any) => {
        setCurrentModel(model);
        setOpen(false);
    }   

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Select Model</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Select Model
                    </DialogTitle>
                    <VisuallyHidden><DialogDescription></DialogDescription></VisuallyHidden>
                </DialogHeader>
                <div className="p-2 grid grid-cols-3">
                    {MODELS.map((model) => (
                        <div 
                            key={model.code} 
                            className={cn("flex items-center justify-center", model.code === currentModel.code ? "border border-blue-500" : "")}
                            onClick={() => handleSelectModel(model)}
                        >
                            {model.name}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}