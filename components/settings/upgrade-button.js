import { createLicenseCheckout } from "@/server/actions/purchase"
import { Button } from "../ui/button"
import useCurrentUserId from "@/hooks/use-current-user-id"
import { useTransition } from "react"
import { cn } from "@/lib/utils"

export default function UpgradeButton({className}) {
    const [isPending, startTransition] = useTransition();
    const userId = useCurrentUserId();

    const handleUpgrade = async () => {
        startTransition(async () => {
            const checkoutResponse = await createLicenseCheckout(userId);

            if (!checkoutResponse.success) {
                toast.error("Upgrading failed! Please try again later.")
                return;
            }

            const checkoutUrl = checkoutResponse?.data?.url;
            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            }
        })
    }

    return (
        <Button className={cn("bg-amber-500 hover:bg-amber-600 hover:scale-105 transition-all duration-300 text-black", className)} onClick={handleUpgrade} disabled={isPending}>
            {isPending ? "Processing..." : "Upgrade"}
        </Button>
    )
}