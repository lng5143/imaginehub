import { User } from "@prisma/client";
import { Dialog, DialogTitle, DialogDescription, DialogContent, DialogHeader, DialogFooter } from "../ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import GeneralForm from "./general-form";
import KeysForm from "./models-form";
import { useState } from "react";

interface SettingsDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    user: User;
}

export default function SettingsDialog({ isOpen, setIsOpen, user } : SettingsDialogProps) {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[850px] sm:h-[600px] p-0 overflow-hidden border-none">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full">
                    <TabsList className="flex flex-col justify-start items-start h-full w-[200px] space-y-2 rounded-none border-r bg-indigo-950 p-4">
                        <TabsTrigger value="general" className="justify-start w-full">General</TabsTrigger>
                        <TabsTrigger value="models" className="justify-start w-full">API Keys</TabsTrigger>
                    </TabsList>
                    <div className="flex-1 space-y-4 p-6 overflow-auto">
                        <DialogHeader>
                            <DialogTitle>{activeTab === "general" ? "General Settings" : "API Keys"}</DialogTitle>
                            <DialogDescription>
                            {activeTab === "general" 
                                ? "Manage your general account settings and preferences."
                                : "Configure your API keys for your AI models."}
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            <TabsContent value="general" className="mt-0 space-y-12">
                                <GeneralForm user={user} />                                
                            </TabsContent>
                            <TabsContent value="models" className="mt-0">
                                <KeysForm />
                            </TabsContent>
                        </div>
                        <DialogFooter>
                        </DialogFooter>
                    </div>
                </Tabs>
            </DialogContent>
      </Dialog>
    )
}