import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

interface CardWrapperProps {
    headerLabel: string;
    children: React.ReactNode;
}

export default function CardWrapper({ children, headerLabel }: CardWrapperProps) {
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