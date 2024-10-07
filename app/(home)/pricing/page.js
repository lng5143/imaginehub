import PricingCard from "@/app/_component/pricing-card"
import { PRICING_PLANS } from "@/const/imagine-box-consts"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  return (
    <div>
        <div className="flex relative flex-col gap-20 pt-40 items-center bg-[url('/pricing-bg.jpg')] bg-cover bg-center bg-no-repeat">
            <h1 className="text-6xl h-[600px] font-bold text-white">Pay Once, unlimited usage</h1>
            <div className="flex absolute -bottom-8 items-center justify-center">
                <div className="w-5/12 h-80">
                    <PricingCard 
                        title={PRICING_PLANS.free.title} 
                        price={PRICING_PLANS.free.price} 
                        features={PRICING_PLANS.free.features} 
                        className="bg-indigo-200 text-slate-950 rounded-none rounded-tl-xl w-full h-full border-none"
                    />
                </div>
                <div className="w-6/12 h-96">
                    <PricingCard 
                        title={PRICING_PLANS.pro.title} 
                        price={PRICING_PLANS.pro.price} 
                        features={PRICING_PLANS.pro.features} 
                        className=" bg-indigo-950 text-white w-full h-full border-none shadow-2xl"
                        cta={<Button className="w-full">Buy Pro License</Button>}
                    />
                </div>
            </div>
        </div>
        <div className="h-[600px] bg-white">

        </div>
    </div>
  )
}  