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

    if (data.samples === 1) {
        return (
            <div className="hover:cursor-pointer">
                <Image
                    src={thumbnail}
                    width={272}
                    height={272}
                    alt="Top image"
                    className="relative z-30 rounded-md shadow-lg"
                />
            </div>
        )
    }

    if (data.samples === 2) {
        return (
            <div className="relative hover:cursor-pointer">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background z-10">
                    <Image
                        src={thumbnail}
                        width={264}
                        height={264}
                        alt="Top image"
                        className="relative z-30 rounded-md shadow-lg w-[96%] h-[96%]"
                    />
                    <Image
                        src={thumbnail}
                        width={264}
                        height={264}
                        alt="Middle image"
                        className="absolute top-[4%] left-[4%] z-20 rounded-md shadow-lg opacity-75 w-[96%] h-[96%]"
                        />
                </div>
            </div>
        )
    }

    return (
        <div className="relative hover:cursor-pointer">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background z-10">
            <Image
                src={thumbnail}
                width={256}
                height={256}
                alt="Top image"
                className="relative z-30 rounded-md shadow-lg w-[92%] h-[92%]"
            />
            <Image
                src={thumbnail}
                width={256}
                height={256}
                alt="Middle image"
                className="absolute top-[4%] left-[4%] z-20 rounded-md shadow-lg opacity-75 w-[92%] h-[92%]"
            />
            <Image
                src={thumbnail}
                width={256}
                height={256}
                alt="Bottom image"
                className="absolute top-[8%] left-[8%] z-10 rounded-md shadow-lg opacity-50 w-[92%] h-[92%]"
            />
            </div>
        </div>
    )
}