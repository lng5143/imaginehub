import { useCurrentModel } from "@/store/use-current-model";
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
import { Model } from "@prisma/client";
import { getModelName } from "@/lib/models";

const models = Object.values(Model);

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
                <Button>{currentModel ? getModelName(currentModel) : "Select Model"}</Button>
            </DialogTrigger>
            <DialogContent className="w-10/12 lg:w-8/12 max-w-full">
                <DialogHeader>
                    <DialogTitle>
                        Select A Model
                    </DialogTitle>
                    <VisuallyHidden><DialogDescription></DialogDescription></VisuallyHidden>
                </DialogHeader>
                <div className="p-2 grid grid-cols-3 gap-4">
                    {models.map((model) => (
                        <div 
                            key={model} 
                            className={cn(
                                "flex items-center justify-center text-center text-sm p-2 h-[80px] border-2 rounded-md cursor-pointer", 
                                model === currentModel ? "border-2 border-blue-500" : "")}
                            onClick={() => handleSelectModel(model)}
                        >
                            {getModelName(model)}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}