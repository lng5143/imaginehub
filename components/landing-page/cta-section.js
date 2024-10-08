"use client"

import EmailForm from "../email-form";
import IBButton from "../ib-button";
import CTAButton from "./cta-button";

export default function CTASection() {

    return (
        <div className="flex items-center gap-20 py-10 bg-indigo-950 px-32 w-full text-white">
            <div className="flex-grow">
                <CTAButton variant="light" />
            </div>
            <EmailForm />
            
        </div>
    )
}