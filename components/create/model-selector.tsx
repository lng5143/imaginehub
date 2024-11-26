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
import { getModelDescription, getModelIcon, getModelName } from "@/lib/models";
import Image from "next/image";

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
                <Button className="rounded-sm">{currentModel ? getModelName(currentModel) : "Select Model"}</Button>
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
                                "flex flex-col gap-2 items-center justify-center text-center text-sm p-4 h-[80px] border-2 rounded-sm cursor-pointer", 
                                model === currentModel ? "border-2 border-blue-500" : "")}
                            onClick={() => handleSelectModel(model)}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Image src={getModelIcon(model) || ""} alt={model} width={20} height={32} />
                                {getModelName(model)}
                            </div>
                                {getModelDescription(model) && <p className="text-xs text-gray-500">{getModelDescription(model)}</p>}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}