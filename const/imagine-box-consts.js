export const SD_PRESETS = ["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "modeling-compound", "neon-punk", "origami", "photographic", "pixel-art", "tile-texture"]
export const SD_RATIOS = ["1:1", "2:3", "3:2", "4:5", "5:4", "9:16", "9:21", "16:9", "21:9"]
export const SD3_MODELS = ["sd3-large", "sd3-turbo", "sd3-medium"]
export const DE2_SIZES = ["256x256", "512x512", "1024x1024"];
export const DE3_SIZES = ["1024x1024", "1024x1792", "1792x1024"];
export const DE3_QUALITIES = ["standard", "hd"];
export const DE2_QUALITIES = ["standard"];
export const MODELS = [
    {
        code: "de-2",
        provider: "openai",
        name: "DALL-E 2",
    },
    {
        code: "de-3",
        provider: "openai",
        name: "DALL-E 3",
    },
    {
        code: "sd3-medium",
        provider: "stability",
        name: "Stable Diffusion 3 Medium",
    },
    {
        code: "sd3-large",
        provider: "stability",
        name: "Stable Diffusion 3 Large",
    },
    {
        code: "sd3-large-turbo",
        provider: "stability",
        name: "Stable Diffusion 3 Turbo",
    },
    {
        code: "si-core",
        provider: "stability",
        name: "Stable Image Core",
    },
    {
        code: "si-ultra",
        provider: "stability",
        name: "Stable Image Ultra",
    }
]

export const IMAGE_BUCKET_NAME = "generated-images";

export const PAGE_SIZE = 24;
export const IMAGINEBOX_OTP_PRICE_ID = "pri_01j9dsw6nd5wwh39bcgse1gsqt";

export const PRICING_PLANS = {
    free: {
        title: "Free",
        price: null,
        features: [
            "10 trials generation",
            "Access to DALL-E and Stable Diffusion",
        ]
    },
    pro: {
        title: "Pro",
        price: 19.97,
        features: [
            "Unlimited image generation",
            "Access to all models",

        ]
    }
}