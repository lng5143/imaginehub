import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AdvancedFormFieldsProps {
    children: React.ReactNode;
}

export default function AdvancedFormFields({ children } : AdvancedFormFieldsProps) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Advanced Inputs</AccordionTrigger>
                <AccordionContent>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}