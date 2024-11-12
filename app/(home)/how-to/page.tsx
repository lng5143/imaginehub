import { TRIAL_IMAGE_COUNT } from "@/const/consts";

export default function HowToPage() {
    return <div className="flex flex-col gap-20 py-40 px-10 md:px-20 lg:px-60 ">
        <h1 className="text-6xl font-bold">How to use ImagineBox</h1>
        <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
            Welcome! ImagineBox is a simple web application that you can use to work with image generation AI models, such as DALL-E, Stable Diffusion, Stable Image, etc.
        </div>
        <div>
            <span className="font-bold">You will need to enter your API keys to start using ImagineBox.</span> You have {TRIAL_IMAGE_COUNT} free generations to start with! After that you will need to purchase lifetime access to continue.
        </div>
        <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold">How to get and enter API keys</h2>
            <div className="flex flex-col gap-5">
                <h3 className="text-xl font-semibold">Get the API key on your preferred image generation model provider</h3>
                <p>Login on your preferred AI provider (eg. OpenAI, Stability AI), and create an API key. You will need to top up credit on these platform to start using their models.</p>
                <p>ImagineBox only provides the web interface and will not charge you for model usage. You can monitor your billing and usage on providers' platform. </p>

                <div className="flex flex-col gap-2">
                    <p>How to create API key and add credits on OpenAI platform:</p>
                    <ul className="list-disc pl-4">
                        <li>Login/Signup on <span className="font-bold"><a href="https://platform.openai.com/" className="text-blue-600 hover:text-blue-800 underline">OpenAI platform</a></span></li>
                        <li>Go to <span className="font-bold">Settings Icon</span> on the top left &gt; <span className="font-bold">Billings</span> to add to credit balance</li>
                        <li>Go to <span className="font-bold">Dashboard</span> &gt; <span className="font-bold">API Keys</span> and create a new API key </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-2">
                    <p>How to create API key and add credits on Stability AI platform:</p>
                    <ul className="list-disc pl-4">
                        <li>Login/Signup on <span className="font-bold"><a href="https://platform.stability.ai/" className="text-blue-600 hover:text-blue-800 underline">Stability AI platform</a></span></li>
                        <li>Go to <span className="font-bold">Account Icon</span> on the top left &gt; <span className="font-bold">Billing</span> to add credits</li>
                        <li>Go to <span className="font-bold">API Keys</span> to create new API key</li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">Login on ImagineBox and enter your API key in settings</h3>
                <p>Login on ImagineBox using email or your Google account. Go to <span className="font-bold">Settings</span> &gt; <span className="font-bold">API Keys</span> to enter your keys. Your keys will be saved to your browser only. They will not go through or be saved to our server. </p>
            </div>
            </div>
            <p className="font-bold">That's it! You are all set to start generating images.</p>
        </div>
    </div>
}