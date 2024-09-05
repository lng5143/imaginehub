import CTAButton from "./cta-button";

export default function HeroSection() {
    return (
        <div className="flex flex-col items-center gap-10 px-32 pt-20">
            <h1 className="text-4xl font-bold">Lorem ipsum dolor sit amet</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien. Sed ut purus eget sapien.</p>
            <CTAButton />
        </div>
    )
}