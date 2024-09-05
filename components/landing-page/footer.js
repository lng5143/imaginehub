'use client'

import Image from "next/image";
import CTAButton from "./cta-button";

export default function FooterSection() {
    const handleSubmitEmail = (e) => {
        e.preventDefault();
        console.log("Email submitted");
    }

    return (
        <div className="px-32 w-full">
            <div className="flex items-center gap-20 py-10">
                <div className="flex-grow">
                    <CTAButton />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Subscribe to receive updates</p>
                    <form onSubmit={handleSubmitEmail}>
                        <input type="email" placeholder="Enter your email" className="border-zinc-100 border-2 rounded-md p-2"/>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
                    </form>
                </div>
            </div>
            <div className="flex gap-20 w-full py-10">
                <div className="flex-grow">
                    <Image src="/logo.svg" alt="logo" width={100} height={100} />
                    <div className="flex gap-5">
                        <Image src="/instagram.svg" alt="instagram" width={20} height={20} />
                        <Image src="/facebook.svg" alt="facebook" width={20} height={20} />
                        <Image src="/twitter.svg" alt="twitter" width={20} height={20} />
                    </div>
                    <p>© 2024 All rights reserved.</p>
                    <div className="flex gap-5">
                        <p>Privacy Policy</p>
                        <p>Terms of Service</p>
                    </div>
                </div>
                <div className="flex gap-10">
                    <div className="flex flex-col">
                    <h3>Product</h3>
                    <p>Pricing</p>
                        <p>About</p>
                        <p>Contact</p>
                    </div>
                    <div className="flex flex-col">
                        <h3>Resources</h3>
                        <p>Documentation</p>
                        <p>Blog</p>
                    </div>
                </div>
            </div>
        </div>
    )
}