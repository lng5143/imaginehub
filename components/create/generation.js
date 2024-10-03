import { ImageIcon, LoaderCircle } from "lucide-react";
import Image from "next/image";

export default function Generation({ data }) {

    if (data.status === "PROCESSING") {
        console.log("processing")

        return (
            <div className="flex w-[272px] h-[272px] items-center justify-center hover:cursor-pointer">
                <LoaderCircle className="size-10 animate-spin" />
            </div>
        )
    }

    const thumbnail = data.images?.[0]?.url;

    if (!thumbnail) {
        return (
            <div className="flex w-[272px] h-[272px] items-center justify-center hover:cursor-pointer">
                <ImageIcon className="size-10" />
            </div>
        )
    }

    return (
        <div className="relative hover:cursor-pointer">
            <div className="flex z-40 items-center justify-center absolute top-2 right-2 bg-white text-gray-800 border-2 border-gray-800 p-1 rounded-full w-6 h-6 text-xs font-semibold">{data.samples}</div>
            <Image
                src={thumbnail}
                width={272}
                height={272}
                alt={data?.prompt}
                className="relative w-full h-full z-30 rounded-md shadow-lg"
            />
        </div>
    )
}