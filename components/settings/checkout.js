import { initializePaddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import useCurrentUserId from "@/hooks/use-current-user-id";

export default function CheckoutButton({ label, priceId}) {
    const userId = useCurrentUserId();
    const [paddle, setPaddle] = useState();

    useEffect(() => {
        initializePaddle({
            environment: "sandbox",
            token: "test_0081c01c3a2de4607ed33df60a2"
        }).then((paddleInstance) => {
            if (paddleInstance) {
                setPaddle(paddleInstance);
            }
        })

    }, [])

    const openCheckout = () => {
        paddle?.Checkout.open({
            items: [{ priceId: priceId, quantity: 1}],
            customData: {
                userId: userId,
                paymentType: "otp"
            }
        })
    }

    return (
        <Button onClick={openCheckout}>{label}</Button>
    )
}