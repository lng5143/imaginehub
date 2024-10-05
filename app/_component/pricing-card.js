import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { cva } from "class-variance-authority";

export default function PricingCard({ title, price, features, cta, ...props}) {

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{price}</CardDescription>
            </CardHeader>
            <CardContent>
                <ul>
                    {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter className="mt-auto w-full">
                {cta}
            </CardFooter>
        </Card>
    )
}