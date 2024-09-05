export default function HowItWorksSection() {
    return (
        <div className="flex flex-col items-center gap-10 w-full px-32 py-10">
            <h2 className="text-2xl font-bold">How It Works</h2>
            <div className="flex gap-20">
                <div className="flex flex-col gap-3 text-center basis-1/3">
                    <h3>Get API Key</h3>
                    <p>Create an account on your favorite image generation provider and get your API key.</p>
                </div>
                <div className="flex flex-col gap-3 text-center basis-1/3">
                    <h3>Save API key</h3>
                    <p>Save your API key on ImagineBox. Your API key is saved on the browser only and will NOT be saved to our servers.</p>
                </div>
                <div className="flex flex-col gap-3 text-center basis-1/3">
                    <h3>Start generating</h3>
                    <p>Start generating images with the chat interface.</p>
                </div>
            </div>
        </div>
    )
}