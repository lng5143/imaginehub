"use client"

import CTAButton from "./cta-button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="bg-[url('/hero-bg.jpg')] flex flex-col lg:flex-row lg:gap-16 items-center bg-cover bg-center bg-no-repeat w-full">
            <div className="flex flex-col gap-10 px-10 md:px-20 py-40 basis-1/3">
                <h1 className="text-5xl font-bold w-full">
                    Simple tool to use your favorite image generation model
                </h1>
                <p>Enter your API key and start generating images. No subscription required.</p>
                <div className="flex flex-col gap-2">
                    <CTAButton />
                    <Link href="/how-to" className="text-gray-700 text-sm underline">How to use</Link>
                </div>
            </div>
            <div className="hidden lg:block pr-20 py-20 lg:py-40 basis-2/3">
                <Image src="/hero-image.png" alt="hero-image" 
                    width={1000}
                    height={1000}
                    priority
                    className="w-full rounded-lg shadow-xl hover:scale-105 transition-all duration-300" />
            </div>
        </div>
    )
}