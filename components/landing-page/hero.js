"use client"

import CTAButton from "./cta-button";

export default function HeroSection() {
    return (
        <div className="bg-[url('/hero-bg.jpg')] flex items-center bg-cover bg-center bg-no-repeat w-full">
            <div className="flex flex-col gap-10 pl-20 pr-8 py-40 basis-1/3">
                <h1 className="text-5xl font-bold w-full">
                    Simple tool to use your favorite image generation model
                </h1>
                <p>Enter your API key and start generating images. No subscription required.</p>
                <CTAButton />
            </div>
            <div className="pr-20 pl-8 py-40 basis-2/3">
                <img src="/hero-image.png" alt="hero-image" 
                    className="w-full rounded-lg shadow-xl hover:scale-105 transition-all duration-300" />
            </div>
        </div>
    )
}