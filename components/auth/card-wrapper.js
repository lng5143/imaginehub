import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import SocialLogin from "./social-login";

export default function CardWrapper({ children, headerLabel }) {
    return (
        <Card>
            <CardHeader>
                <div className="text-2xl font-bold text-center">
                    {headerLabel}
                </div>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <SocialLogin  />
            </CardFooter>
        </Card>
    )
}