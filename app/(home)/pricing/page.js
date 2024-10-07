import PricingCard from "@/app/_component/pricing-card"
import { PRICING_PLANS } from "@/static-data/pricing"
import { Button } from "@/components/ui/button"
import FAQSection from "@/components/landing-page/faq"

export default function PricingPage() {
  return (
    <div>
        <div className="flex relative pt-40 justify-center bg-[url('/pricing-bg.jpg')] bg-cover bg-center bg-no-repeat">
            <h1 className="text-6xl h-[500px] font-bold text-white">Pay once, use forever</h1>
            <div className="flex absolute -bottom-8 items-center justify-center w-full">
                <div className="w-3/12 h-80">
                    <PricingCard 
                        variant="light"
                        title={PRICING_PLANS.free.title} 
                        price={PRICING_PLANS.free.price} 
                        features={PRICING_PLANS.free.features} 
                        className="rounded-none rounded-tl-xl w-full h-full border-none"
                    />
                </div>
                <div className="w-4/12 h-96">
                    <PricingCard 
                        variant="dark"
                        title={PRICING_PLANS.pro.title} 
                        price={PRICING_PLANS.pro.price} 
                        features={PRICING_PLANS.pro.features} 
                        className="w-full h-full border-none shadow-2xl"
                        cta={<Button className="w-full bg-white text-slate-950 shadow-xl hover:bg-amber-500 hover:scale-105 transition-all duration-300">Buy Pro License</Button>}
                    />
                </div>
            </div>
        </div>
        <div className="h-[600px] bg-white py-20">
            <FAQSection />
        </div>
    </div>
  )
}  