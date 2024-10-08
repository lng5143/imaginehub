import { TRIAL_IMAGE_COUNT } from "../const/imagine-box-consts";

export const PRICING_PLANS = {
    free: {
        title: "Free",
        price: null,
        features: [
            `${TRIAL_IMAGE_COUNT} trials generation`,
            "Limited access to models",
            "30 days storage"
        ]
    },
    pro: {
        title: "Pro",
        price: "$19.97",
        features: [
            "Unlimited image generation",
            "Access to all models",
            "Unlimited storage"
        ]
    }
}