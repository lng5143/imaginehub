import PricingCard from "@/app/_component/pricing-card"
import { PRICING_PLANS } from "@/const/imagine-box-consts"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-20 py-40 items-center">
        <h1 className="text-3xl font-bold">Pay Once, unlimited usage</h1>
        <div className="flex justify-center">
            <div className="py-5 w-5/12 h-96">
                <PricingCard 
                    title={PRICING_PLANS.free.title} 
                    price={PRICING_PLANS.free.price} 
                    features={PRICING_PLANS.free.features} 
                    className="bg-gray-200 rounded-r-none w-full h-full"
                />
            </div>
            <div className="w-5/12 h-96">
                <PricingCard 
                    title={PRICING_PLANS.pro.title} 
                    price={PRICING_PLANS.pro.price} 
                    features={PRICING_PLANS.pro.features} 
                    className=" bg-gray-800 text-white w-full h-full"
                    cta={<Button className="w-full">Buy Pro License</Button>}
                />
            </div>
        </div>
    </div>
  )
}  