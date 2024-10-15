'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheckBig, CircleX, Loader } from "lucide-react";
import { useEffect } from "react";
import { PAYMENT_UPDATES_STATUS } from "@/const/imagine-box-consts";
import { useRouter, useSearchParams } from "next/navigation";
import { usePaymentUpdates } from "@/hooks/use-payment-updates";

const StatusContent = ({ status }) => {
    const statusConfig = {
      [PAYMENT_UPDATES_STATUS.loading]: {
        Icon: Loader,
        iconClass: "w-28 h-28 animate-spin",
        message: "Please wait while we update your account information..."
      },
      [PAYMENT_UPDATES_STATUS.failed]: {
        Icon: CircleX,
        iconClass: "w-28 h-28 text-red-500",
        message: <>We are unable to update your account information. Please contact support at <a className="text-blue-500 hover:text-blue-600 underline" href="mailto:support@imaginebox.com">support@imaginebox.com</a></>
      },
      [PAYMENT_UPDATES_STATUS.timeOut]: {
        Icon: CircleX,
        iconClass: "w-28 h-28 text-red-500",
        message: <>We are unable to update your account information. Please contact support at <a className="text-blue-500 hover:text-blue-600 underline" href="mailto:support@imaginebox.com">support@imaginebox.com</a></>
      },
      [PAYMENT_UPDATES_STATUS.success]: {
        Icon: CircleCheckBig,
        iconClass: "w-28 h-28 text-green-500",
        message: "Your account has been updated! You will be redirected to the main app..."
      }
    };


    const { Icon, iconClass, message } = statusConfig[status] || statusConfig[PAYMENT_UPDATES_STATUS.loading];

    if (!Icon) {
        return null;
    }

    return (
        <div className="flex flex-col gap-10 items-center">
            <Icon className={iconClass} />
            <p className="text-sm text-center">{message}</p>
        </div>
    )
}

export default function UpgradeWait() {
    const searchParams = useSearchParams();

    const orderId = searchParams.get('orderId');
    const status = usePaymentUpdates(orderId);
    
    const router = useRouter();

    useEffect(() => {
        if (status === PAYMENT_UPDATES_STATUS.success) {
            const timer = setTimeout(() => router.push('/create'), 2000);
            return () => clearTimeout(timer);
        }
    }, [status, router]);

    return (
        <div className="flex justify-center items-center h-screen bg-indigo-950">
            <Card className="flex flex-col p-3 w-1/2">
                <CardHeader className="mb-8">
                    <CardTitle className="text-2xl">Payment Success!</CardTitle>
                    <CardDescription>Thank you for purchasing ImagineBox Lifetime Access!</CardDescription>
                </CardHeader>
                <CardContent className="mb-8">
                    <StatusContent status={status} />
                </CardContent>
            </Card>
        </div>
    )
}