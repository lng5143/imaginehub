import HeroSection from "@/components/landing-page/hero";
import HowItWorksSection from "@/components/landing-page/how-it-works";
import BenefitsSection from "@/components/landing-page/benefits";
import FAQSection from "@/components/landing-page/faq";
import FooterSection from "@/components/landing-page/footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-10">
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <FAQSection />
      <FooterSection />
    </main>
  )
}