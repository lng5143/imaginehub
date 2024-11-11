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

export default function ModelSelector() {
    const [currentModel, setCurrentModel] = useCurrentModel();
    const [openModelSelector, setOpenModelSelector] = useState(false);


    return (
        // <Popover open={openModelSelector} onOpenChange={setOpenModelSelector}>
        //     <PopoverTrigger asChild>
        //         <Button variant="outline" role="combobox" aria-expanded={openModelSelector} className="w-full justify-between text-sm shadow-lg">
        //             {currentModel.name ? currentModel.name : "Select a model"}
        //         </Button>
        //     </PopoverTrigger>
        //     <PopoverContent align="start" className="w-80 shadow-lg p-2">
        //         <Command>
        //             <CommandInput className="text-sm" placeholder="Search model..." />
        //             <CommandList>
        //                 <CommandEmpty><p className="text-sm">No model found.</p></CommandEmpty>
        //                 <CommandGroup className="">
        //                     {MODELS.map((model) => (
        //                         <CommandItem
        //                             className="flex items-center text-sm"
        //                             key={model.code}
        //                             value={model.name}
        //                             onSelect={() => {
        //                                 setCurrentModel(model)
        //                                 setOpenModelSelector(false)
        //                             }}
        //                         >
        //                             <p className="flex-grow">{model.name}</p>
        //                             <Check
        //                                 className={cn(
        //                                 "mr-2 h-4 w-4",
        //                                 currentModel.code === model.code ? "opacity-100" : "opacity-0"
        //                                 )}
        //                             />
        //                         </CommandItem>
        //                     ))}
        //                 </CommandGroup>
        //             </CommandList>
        //         </Command>
        //     </PopoverContent>
        // </Popover>
        <Dialog>
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
                        <div key={model.code} className="flex items-center justify-center">
                            {model.name}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}