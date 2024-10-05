import { Dialog, DialogTitle, DialogDescription, DialogContent, DialogHeader, DialogFooter } from "../ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import GeneralForm from "./general-form";
import ModelsForm from "./models-form";
import { useState } from "react";
import CheckoutButton from "./checkout";
import { IMAGINEBOX_OTP_PRICE_ID } from "@/const/imagine-box-consts";

export default function SettingsDialog({ isOpen, setIsOpen }) {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[850px] sm:h-[600px] p-0 overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full">
                    <TabsList className="flex flex-col justify-start items-start h-full w-[200px] space-y-2 rounded-none border-r bg-muted p-4">
                        <TabsTrigger value="general" className="justify-start w-full">General</TabsTrigger>
                        <TabsTrigger value="models" className="justify-start w-full">Models</TabsTrigger>
                    </TabsList>
                    <div className="flex-1 p-6 overflow-auto">
                    <DialogHeader>
                        <DialogTitle>{activeTab === "general" ? "General Settings" : "Model Settings"}</DialogTitle>
                        <DialogDescription>
                        {activeTab === "general" 
                            ? "Manage your general account settings and preferences."
                            : "Configure your AI model settings and parameters."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                        <TabsContent value="general" className="mt-0">
                            <GeneralForm />
                            <CheckoutButton label="Upgrade" priceId={IMAGINEBOX_OTP_PRICE_ID} />
                        </TabsContent>
                        <TabsContent value="models" className="mt-0">
                            <ModelsForm />
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