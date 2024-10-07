import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
export default function PricingCard({ variant, title, price, features, cta, ...props}) {

    return (
        <Card className={cn("flex flex-col w-full",variant === "light" ? "bg-indigo-200 text-slate-950" : "bg-indigo-950 text-white", props.className)}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className={cn("text-3xl font-bold", variant === "light" ? "text-slate-950" : "text-white")}>{price}</CardDescription>
            </CardHeader>
            <hr className={cn("my-2 w-5/6 self-center border-dashed", variant === "light" ? "border-slate-950" : "border-white")} />
            <CardContent className="flex-grow pt-4">
                <ul className="flex flex-col gap-3">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-4 text-sm">
                            <CircleCheck className="w-4 h-4" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter className="w-full">
                {cta}
            </CardFooter>
        </Card>
    )
}