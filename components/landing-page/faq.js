import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { FAQs } from "@/data/landing-page-data";

export default function FAQSection() {
    return (
        <div className="flex flex-col items-center gap-10 px-32">
            <h2 className="text-2xl font-bold">FAQ Section</h2>
            <div>
                <Accordion type="single" collapsible className="flex flex-col gap-10">
                    {/* <AccordionItem>
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem> */}
                    {FAQs.map((faq, index) => (
                        <AccordionItem key={index} value={`faq-${index}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}