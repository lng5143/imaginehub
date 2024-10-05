import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingCard({ title, price, features}) {
    return (
        <Card>
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
        </Card>
    )
}