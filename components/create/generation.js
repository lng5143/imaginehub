import { ImageIcon, LoaderCircle } from "lucide-react";

export default function Generation({ data }) {
    const thumbnail = data.images?.[0]?.url;

    return (
        <div className="relative flex items-center justify-center hover:cursor-pointer hover:scale-105 hover:z-50 transition-all duration-300 aspect-square rounded-md shadow-xl">
            {data.status === "PROCESSING" && (
                <LoaderCircle className="size-[10%] animate-spin" />
            )}
            {data.status === "SUCCESS" && !thumbnail && (
                <ImageIcon className="size-5 opacity-50" />
            )}
            {data.status === "SUCCESS" && thumbnail && (
                <>
                    <div className="flex z-40 items-center justify-center absolute top-2 right-2 bg-white text-gray-800 border-2 border-gray-800 p-1 rounded-full w-6 h-6 text-xs font-semibold">{data.samples}</div>
                    <img
                        src={thumbnail}
                        alt={data?.prompt}
                        className="relative z-30 rounded-md"
                    />
                </>
                
            )}
        </div>
    )
}