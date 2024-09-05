import Image from "next/image";

export default function BenefitItem({ description, image }) {
    return (
        <div className="flex flex-col items-center gap-10 basis-1/3">
            <Image src={image} alt="benefit" width={100} height={100} />
            <p>{description}</p>
        </div>
    )
}