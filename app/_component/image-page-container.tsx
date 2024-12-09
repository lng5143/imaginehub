import CTASection from "@/components/landing-page/cta-section";
import FAQSection from "@/components/landing-page/faq";
import Image from "next/image";

export interface ImagePageDetails {
    imageUrl: string; 
    prompt: string; 
    model: string;
    generationCost: string;
    modelProvider: string; 
    negativePrompt: string;
    stylePreset: string; 
    slug: string;
}

interface ImagePageContainerProps {
    generationDetails: ImagePageDetails;
}

export default function ImagePageContainer({ generationDetails }: ImagePageContainerProps) {
    return (
        <div className="flex flex-col gap-4 items-center"> 
            <div className="flex gap-10 items-center justify-center px-20">
                <Image src={generationDetails.imageUrl} alt="Generated Image" width={512} height={512} />
                <div className="flex flex-col gap-2">
                    <GenerationDetail label="Prompt" value={generationDetails.prompt} />
                    <GenerationDetail label="Model" value={generationDetails.model} />
                    <GenerationDetail label="Generation Cost" value={generationDetails.generationCost} />
                    <GenerationDetail label="Model Provider" value={generationDetails.modelProvider} />
                    <GenerationDetail label="Negative Prompt" value={generationDetails.negativePrompt} />
                    <GenerationDetail label="Style Preset" value={generationDetails.stylePreset} />
                </div>
            </div>
            <FAQSection />
            <CTASection />
        </div>
    )
}

const GenerationDetail = ({ label, value }: { label: string, value: string }) => {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">{label}</p>
            <p className="text-sm p-2 bg-gray-100 rounded-md">{value}</p>
        </div>
    )
}