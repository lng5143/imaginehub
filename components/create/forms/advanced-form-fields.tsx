import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AdvancedFormFieldsProps {
    children: React.ReactNode;
}

export default function AdvancedFormFields({ children } : AdvancedFormFieldsProps) {
    return (
        <Accordion type="single" collapsible className="p-0">
            <AccordionItem value="item-1" className="bg-gray-100 px-2 py-0 rounded-md flex flex-col gap-2">
                <AccordionTrigger className="py-4 font-bold">Advanced Inputs</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 px-2">
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}