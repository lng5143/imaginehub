import { Dialog, DialogTitle, DialogDescription, DialogContent, DialogHeader, DialogFooter } from "../ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import GeneralForm from "./general-form";
import KeysForm from "./models-form";
import { useState } from "react";
import UpgradeButton from "./upgrade-button";
import { UserTier } from "@prisma/client";
import useCurrentUser from "@/hooks/use-current-user";
import { TRIAL_IMAGE_COUNT } from "@/const/imagine-box-consts";

export default function SettingsDialog({ isOpen, setIsOpen }) {
    const user = useCurrentUser();
    const userTier = user?.tier;
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
                                {userTier === UserTier.FREE &&
                                    <div className="flex flex-col gap-2">
                                        <p>Trials: {user?.trialCredits}/{TRIAL_IMAGE_COUNT}</p>
                                        <p className="text-sm">Upgrade for unlimited generations and storage.</p>
                                        <UpgradeButton className="w-40" />
                                    </div>
                                }
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