import { ImageGenerationStatus } from "@prisma/client";
import { CircleX, ImageIcon, LoaderCircle, XIcon } from "lucide-react";
import Image from "next/image";

export default function Generation({ data, onClick }) {
    const thumbnail = data.images?.[0]?.url;

    return (
        <div 
            className="relative flex items-center justify-center hover:cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300 aspect-square rounded-md shadow-lg"
            onClick={onClick}
        >
            {data.status === ImageGenerationStatus.PROCESSING && (
                <LoaderCircle className="size-[10%] animate-spin" />
            )}
            {data.status === ImageGenerationStatus.COMPLETED && !thumbnail && (
                <ImageIcon className="size-[10%] opacity-50" />
            )}
            {data.status === ImageGenerationStatus.FAILED && (
                <CircleX className="size-[10%] opacity-50" />
            )}
            {data.status === ImageGenerationStatus.COMPLETED && thumbnail && (
                <>
                    <div className="flex z-40 items-center justify-center absolute top-2 right-2 bg-white text-gray-800 shadow-2xl border-gray-800 p-1 rounded-full w-6 h-6 text-xs font-semibold">{data.samples}</div>
                    <Image
                        src={thumbnail}
                        alt={data?.prompt}
                        className="relative z-30 rounded-md aspect-square object-cover"
                        width={1000}
                        height={1000}
                        layout="responsive"
                        priority
                    />
                </>
                
            )}
        </div>
    )
}