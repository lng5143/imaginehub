"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { FAQs } from "@/static-data/landing-page-data";
import FAQItem from "./faq-item";

export default function FAQSection() {
    return (
        <div className="flex flex-col items-center gap-10 px-32 py-32 w-full">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <div className="w-10/12">
                <ul className="flex flex-col">
                    {FAQs.map((faq, index) => (
                        <li key={index}>
                            <FAQItem question={faq.question} answer={faq.answer} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}