"use client"

import IBButton from "../ib-button";
import CTAButton from "./cta-button";

export default function CTASection() {
    const handleSubmitEmail = (e) => {
        e.preventDefault();
        console.log("Email submitted");
    }

    return(
        <div className="flex items-center gap-20 py-10 bg-indigo-950 px-32 w-full text-white">
            <div className="flex-grow">
                <CTAButton variant="light" />
            </div>
            <div className="flex flex-col gap-3">
                <p>Subscribe to receive updates</p>
                <form className="flex items-center gap-2" onSubmit={handleSubmitEmail}>
                    <input type="email" placeholder="Enter your email" className="border-zinc-100 text-xs border-2 rounded-md p-2"/>
                    <IBButton variant="light">Submit</IBButton>
                </form>
            </div>
        </div>
    )
}