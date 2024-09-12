import { Car } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import SocialLogin from "./social-login";

export default function CardWrapper({ children, headerLabel }) {
    return (
        <Card className="w-[400px] h-fit">
            <CardHeader>
                <div className="text-2xl font-bold text-center">
                    {headerLabel}
                </div>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}