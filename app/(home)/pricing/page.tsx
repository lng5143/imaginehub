import PricingCard from "@/app/_component/pricing-card"
import { PRICING_PLANS } from "@/const/consts"
import { Button } from "@/components/ui/button"
import FAQSection from "@/components/landing-page/faq"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div>
        <div className="flex flex-col relative pt-40 px-10 md:px-20 gap-10 items-center justify-center bg-[url('/pricing-bg.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="flex flex-col gap-10 md:h-[550px] text-center">
                <h1 className="text-6xl font-bold text-white">Pay once, use forever</h1>
                <p className="text-white">No subscription, no hidden fees, no monthly charges.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-0 md:absolute -bottom-8 items-center justify-center w-full">
                <div className="w-full md:w-3/12 md:h-80">
                    <PricingCard 
                        variant="light"
                        title={PRICING_PLANS.free.title} 
                        price={PRICING_PLANS.free.price} 
                        features={PRICING_PLANS.free.features} 
                        className="md:rounded-none md:rounded-tl-xl w-full h-full border-none"
                    />
                </div>
                <div className="w-full md:w-4/12 md:h-96">
                    <PricingCard 
                        variant="dark"
                        title={PRICING_PLANS.pro.title} 
                        price={PRICING_PLANS.pro.price} 
                        features={PRICING_PLANS.pro.features} 
                        className="w-full h-full border-none shadow-2xl"
                        cta={
                            <Button className="w-full bg-white text-slate-950 shadow-xl hover:bg-amber-500 hover:scale-105 transition-all duration-300">
                                <Link href="/create">
                                    Buy Pro License
                                </Link>
                            </Button>
                        }
                    />
                </div>
            </div>
        </div>
        <FAQSection />
    </div>
  )
}  