import Image from "next/image";

export default function Generation({ image, count }) {

    if (count === 1) {
        return (
            <div className="w-[272px]">
                <Image
                    src={image}
                    width={272}
                    height={272}
                    alt="Top image"
                    className="relative z-30 rounded-md shadow-lg"
                />
            </div>
        )
    }

    if (count === 2) {
        return (
            <div className="relative w-[272px]">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background z-10">
                    <Image
                        src={image}
                        width={264}
                        height={264}
                        alt="Top image"
                        className="relative z-30 rounded-md shadow-lg w-[96%] h-[96%]"
                    />
                    <Image
                        src={image}
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
        <div className="relative w-[272px]">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background z-10">
            <Image
                src={image}
                width={256}
                height={256}
                alt="Top image"
                className="relative z-30 rounded-md shadow-lg w-[92%] h-[92%]"
            />
            <Image
                src={image}
                width={256}
                height={256}
                alt="Middle image"
                className="absolute top-[4%] left-[4%] z-20 rounded-md shadow-lg opacity-75 w-[92%] h-[92%]"
            />
            <Image
                src={image}
                width={256}
                height={256}
                alt="Bottom image"
                className="absolute top-[8%] left-[8%] z-10 rounded-md shadow-lg opacity-50 w-[92%] h-[92%]"
            />
            </div>
        </div>
    )
}