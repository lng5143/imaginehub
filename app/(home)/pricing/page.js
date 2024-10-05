import PricingCard from "@/app/_component/pricing-card"

export default function PricingPage() {
  return (
    <>
    <h1>Pay Once</h1>
    <div>
        <PricingCard title="Basic" price="$10" features={["10 users", "Basic support", "Email support"]} />
    </div>
    </>
  )
}  