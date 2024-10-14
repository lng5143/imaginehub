'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheckBig, CircleX, Loader, TriangleAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { PAYMENT_UPDATES_STATUS } from "@/const/imagine-box-consts";

export default function UpgradeWait() {
    const [status, setStatus] = useState(PAYMENT_UPDATES_STATUS.loading);

    // handle eventSource
    useEffect(() => {
        const eventSource = new EventSource('/api/events/payment-updates');

        eventSource.onmessage = (event) => {
            const status = JSON.parse(event.data);
            setStatus(status);
        }

        return () => {
            eventSource.close();
        }
    }, []);

    const content = () => {
        switch (status) {
            case PAYMENT_UPDATES_STATUS.loading:
                return (
                    <div className="flex flex-col gap-10 items-center">
                        <Loader className="w-28 h-28 animate-spin" />
                        <p className="text-sm text-center">Please wait while we update your account information...</p>
                    </div>
                );
            case PAYMENT_UPDATES_STATUS.firstFail:
                return (
                    <div className="flex flex-col gap-10 items-center">
                        <TriangleAlertIcon className="w-28 h-28 text-yellow-500" />
                        <p className="text-sm text-center">There was an issue updating your account information. We are trying again...</p>
                    </div>
                );
            case PAYMENT_UPDATES_STATUS.failed:
                return (
                    <div className="flex flex-col gap-10 items-center">
                        <CircleX className="w-28 h-28 text-red-500" />
                        <p className="text-sm text-center">We are unable to update your account information. Please contact support at <a className="text-blue-500 hover:text-blue-600 underline" href="mailto:support@imaginebox.com">support@imaginebox.com</a></p>
                    </div>
                );
            case PAYMENT_UPDATES_STATUS.success:
                return (
                    <div className="flex flex-col gap-10 items-center">
                        <CircleCheckBig className="w-28 h-28 text-green-500" />
                        <p className="text-sm text-center">Your account has been updated! You will be redirected to the main app...</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-indigo-950">
            <Card className="flex flex-col p-3 w-1/2">
                <CardHeader className="mb-8">
                    <CardTitle className="text-2xl">Payment Success!</CardTitle>
                    <CardDescription>Thank you for purchasing ImagineBox Lifetime Access!</CardDescription>
                </CardHeader>
                <CardContent className="mb-8">
                    {content()}
                </CardContent>
            </Card>
        </div>
    )
}