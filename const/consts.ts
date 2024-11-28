import { getModelName } from "@/lib/models";
import { Model } from "@prisma/client";

export const SD_PRESETS = ["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "modeling-compound", "neon-punk", "origami", "photographic", "pixel-art", "tile-texture"]
export const SD_RATIOS = ["1:1", "2:3", "3:2", "4:5", "5:4", "9:16", "9:21", "16:9", "21:9"]
export const DE2_SIZES = ["256x256", "512x512", "1024x1024"];
export const DE3_SIZES = ["1024x1024", "1024x1792", "1792x1024"];
export const DE3_QUALITIES = ["standard", "hd"];

// TODO: determine if IMAGE_BUCKET_NAME, IMAGINEBOX_OTP_PRICE_ID should be env var
export const IMAGE_BUCKET_NAME = "generated-images";

export const PAGE_SIZE = 24;
export const IMAGINEBOX_OTP_PRICE_ID = "pri_01j9dsw6nd5wwh39bcgse1gsqt";
export const CONTACT_EMAIL = "admin@imaginebox.me";
export const TRIAL_IMAGE_COUNT = 10;
export const PRIMARY_COLOR_HEX = '#1e1b4b';
export const PAYMENT_UPDATES_STATUS = {
    loading: 'loading',
    failed: 'failed',
    success: 'success',
    timeOut: 'timeOut'
}

export const HINTS = {
    PROMPT: `Description of what you want to generate. \nEg. "A photograph of a white Siamese cat"`,
    DE_SIZE: `The size of the image to generate. \nDall-E 3 supports 1024x1024, 1024x1792, and 1792x1024. Dall-E 2 only supports 256x256, 512x512, and 1024x1024.`,
    DE_QUALITY: `HD is only supported on Dall-E 3.`,
    DE_SAMPLES: `The number of images to generate. From 1 to 10. Only supported on DALL-E 2`,
    SD_PRESETS: `Style preset to use for generation. Only available for Stable Image Core.`,
    SD_RATIOS: `Aspect ratio of the image to generate.`,
    SD_SEED: `A specific value that is used to guide the 'randomness' of the generation: [0 .. 4294967294]`,
    SD_NEGATIVE_PROMPT: `Description of what you don't want to generate.`,
    FL_WIDTH: `Width of the generated image. \nMinimum of 256 and maximum of 1792 for FLUX.1 [schnell], minimum of 256 and maximum of 1440 for FLUX.1 [pro] and FLUX 1.1 [pro]. \nMust be a multiple of 32.`,
    FL_HEIGHT: `Height of the generated image. \nMinimum of 256 and maximum of 1792 for FLUX.1 [schnell], minimum of 256 and maximum of 1440 for FLUX.1 [pro] and FLUX 1.1 [pro]. \nMust be a multiple of 32.`,
    FL_SEED: `Optional seed for reproducibility. Must be an integer from 0 to 99999999.`,
    FL_STEPS: `Number of diffusion steps. \nFrom 1 to 4 for FLUX.1 [schnell], from 1 to 50 for FLUX.1 [pro] and FLUX 1.1 [pro].`,
    FL_SAMPLES: `The number of images to generate. From 1 to 4.`,
}

export const BLOG_PAGE_SIZE = 9;

export const WEBHOOK_EVENT_TYPE = {
    ORDER_CREATED: 'order_created'
}

export const LSConsts = {
    OPEN_AI_API_KEY: 'ib_openai_api_key',
    STABILITY_API_KEY: 'ib_stability_api_key',
    REPLICATE_API_KEY: 'ib_replicate_api_key',
    TOGETHER_API_KEY: 'ib_together_api_key',
    PENDING_GENERATIONS: 'ib-pending-generations'
}

export enum ERROR_TYPES {
    NO_API_KEY,
    INVALID_PROVIDER
}

export const PRICING_PLANS = {
    free: {
        title: "Free",
        price: null,
        features: [
            `${TRIAL_IMAGE_COUNT} trials generation`,
            "Access to all models",
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

export const BENEFITS = [
    {
        "title": "Choose your own provider",
        "description": "Use any image generation provider (OpenAI, Stability AI, etc.) you want.",
    },
    {
        "title": "Pay once, use forever",
        "description": "No need to pay monthly subscription. You only pay once for the lifetime access, including future updates.",
    },
    {
        "title": "Safe & secure keys",
        "description": "Complete control over your API keys. We will NOT store your API keys.",
    },
    {
        "title": "Control over your API costs",
        "description": "You have full control over your API costs. Access the dashboard of model providers to manage your costs.",
    },
    {
        "title": "Simple interface",
        "description": "Intuitive and simple interface to start generating images as fast as possible.",
    },
    {
        "title": "Unlimited storage",
        "description": "We store generated images for better user experience. We currently do not have plan to charge for storage.",
    },
]

export const FAQs = [
    {
        "question": "What are the requirements to use ImagineBox?",
        "answer": `You need to have an API key from a supported image generation provider. You can create an account on providers like OpenAI, Stability AI, and get your API key. You also need a lifetime license after ${TRIAL_IMAGE_COUNT} trial generations.`
    },
    {
        "question": "What image generation models are supported?",
        "answer": "We currently support DALL-E 2, DALL-E 3, Stable Diffusion 3.5, Stable Image Core, Stable Image Ultra, FLUX.1 [schnell], FLUX.1 [pro], and FLUX 1.1 [pro]. We have plans to add more models in the future."
    },
    {
        "question": "Do I need to subscribe to anything?",
        "answer": "No. You do not need to subscribe to anything. You only pay the models providers for what you use, and buy a lifetime access to ImagineBox."
    },
    {
        "question": "Is my API key secure?",
        "answer": "Yes. Your API keys are stored locally on your browser only. ImagineBox will directly use the locally stored key to interface with the image generation providers. Your API keys will NOT go through our servers or saved to our database."
    },
    {
        "question": "What image features are supported at the moment?",
        "answer": "Fow now we support image generation. Image editing and upscaling are coming soon."
    },
    {
        "question": "Is my generated image stored on ImagineBox?",
        "answer": "Yes. We store your generated images for better user experience. We currently do not have plans to charge for storage."
    },
    {
        "question": "Can I get a refund if I am not satisfied with the service?",
        "answer": "We currently do not offer refund, with the exception of very specific circumstances. Please refer to our Refund Policy for more details."
    },
    {
        "question": "Do I have lifetime access to future updates?",
        "answer": "Yes. Even though we may change the pricing plans and feature tiers in the future, we will do our best to guarantee access to all features added for customers who have purchased a lifetime license at the moment."
    },
]

export const HOW_IT_WORKS = [
    {
        "title": "Get API Key",
        "description": "Create an account on your preferred image generation provider and get your API key.",
    },
    {
        "title": "Save API key",
        "description": "Save your API key on ImagineBox. Your API key is saved on the browser only and will NOT be saved to our servers.",
    },
    {
        "title": "Start generating",
        "description": "Start generating images with your model of choice.",
    }
]

export const SUPPORTED_MODELS = [
    {
        name: "DALL-E 2",
        developer: "OpenAI",
        apiProvider: "OpenAI",
        estimatedCost: "$0.018"
    },
    {
        name: "DALL-E 3",
        developer: "OpenAI",
        apiProvider: "OpenAI",
        estimatedCost: "$0.04 - $0.12"
    },
    {
        name: "Stable Diffusion 3.5 Medium",
        developer: "Stability AI",
        apiProvider: "Stability AI",
        estimatedCost: "$0.035"
    },
    {
        name: "Stable Diffusion 3.5 Large",
        developer: "Stability AI",
        apiProvider: "Stability AI",
        estimatedCost: "$0.065"
    },
    {
        name: "Stable Diffusion 3.5 Large Turbo",
        developer: "Stability AI",
        apiProvider: "Stability AI",
        estimatedCost: "$0.04"
    },
    {
        name: "Stable Image Core",
        developer: "Stability AI",
        apiProvider: "Stability AI",
        estimatedCost: "$0.03"
    },
    {
        name: "Stable Image Ultra",
        developer: "Stability AI",
        apiProvider: "Stability AI",
        estimatedCost: "$0.08"
    },
    {
        name: "FLUX.1 [schnell] (Free)",
        developer: "Black Forest Labs",
        apiProvider: "together.ai",
        estimatedCost: "free"
    },
    {
        name: "FLUX.1 [pro]",
        developer: "Black Forest Labs",
        apiProvider: "together.ai",
        estimatedCost: "$0.05"
    },
    {
        name: "FLUX 1.1 [pro]",
        developer: "Black Forest Labs",
        apiProvider: "together.ai",
        estimatedCost: "$0.04"
    }
]