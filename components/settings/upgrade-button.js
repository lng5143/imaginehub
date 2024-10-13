import { createLicenseCheckout } from "@/server/actions/purchase"
import { Button } from "../ui/button"
import useCurrentUserId from "@/hooks/use-current-user-id"
import { useTransition } from "react"

export default function UpgradeButton() {
    const [isPending, startTransition] = useTransition();
    const userId = useCurrentUserId();

    const handleUpgrade = async () => {
        startTransition(async () => {
            const checkoutResponse = await createLicenseCheckout(userId);
            const checkoutUrl = checkoutResponse?.data?.url;
            console.log(checkoutResponse);
            console.log(checkoutUrl)
            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            }
        })
    }

    return (
        <Button onClick={handleUpgrade} disabled={isPending}>
            {isPending ? "Processing..." : "Upgrade"}
        </Button>
    )
}