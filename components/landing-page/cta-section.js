"use client"

import CTAButton from "./cta-button";

export default function CTASection() {
    const handleSubmitEmail = (e) => {
        e.preventDefault();
        console.log("Email submitted");
    }

    return(
        <div className="flex items-center gap-20 py-10 bg-blue-500 px-32 w-full">
                <div className="flex-grow">
                    <CTAButton />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Subscribe to receive updates</p>
                    <form className="flex items-center gap-2" onSubmit={handleSubmitEmail}>
                        <input type="email" placeholder="Enter your email" className="border-zinc-100 border-2 rounded-md p-2"/>
                        <button type="submit" className="bg-indigo-950 text-white px-4 py-2 rounded-md">Submit</button>
                    </form>
                </div>
            </div>
    )
}