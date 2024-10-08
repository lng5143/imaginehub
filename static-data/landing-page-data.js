import { TRIAL_IMAGE_COUNT } from "@/const/imagine-box-consts"

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
        "answer": "We currently support DALL-E 2, DALL-E 3, Stable Diffusion 3, Stable Image Core, and Stable Image Ultra. We have plans to add more models in the future."
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
