import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
    headerLabel: string;
    children: React.ReactNode;
    className?: string;
}

export default function CardWrapper({ children, headerLabel, className }: CardWrapperProps) {
    return (
        <Card className={cn("w-[400px] h-fit", className)}>
            <CardHeader>
                <div className="text-2xl font-bold text-center text-white">
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