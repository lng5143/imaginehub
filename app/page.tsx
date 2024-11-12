import HeroSection from "@/components/landing-page/hero";
import HowItWorksSection from "@/components/landing-page/how-it-works";
import BenefitsSection from "@/components/landing-page/benefits";
import FAQSection from "@/components/landing-page/faq";
import FooterSection from "@/components/landing-page/footer";
import CTASection from "@/components/landing-page/cta-section";
import HeroNavBar from "@/app/_component/hero-nav-bar";

export default function Home() {
  return (
    <main className="flex flex-col items-center relative">
      <HeroNavBar />
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </main>
  )
}