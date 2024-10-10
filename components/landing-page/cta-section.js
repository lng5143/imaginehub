"use client"

import EmailForm from "../email-form";
import CTAButton from "./cta-button";

export default function CTASection() {

    return (
        <div className="bg-[url('/bg-cta.jpg')] bg-cover bg-center flex flex-col md:flex-row md:items-center gap-10 md:gap-20 py-10 px-10 md:px-32 w-full text-white shadow-2xl">
            <div className="flex-grow">
                <CTAButton variant="light" />
            </div>
            <div className="w-[400px]">
                <EmailForm />
            </div>
        </div>
    )
}