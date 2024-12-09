import Image from "next/image";
import { IMAGE_PAGES_DATA } from "@/const/static-data";

const getRandomListOfImages = () : any[] => {
    const normalImages = IMAGE_PAGES_DATA.filter(image => image.display === "normal")
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);
    const verticalImages = IMAGE_PAGES_DATA.filter(image => image.display === "vertical")
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
    const horizontalImages = IMAGE_PAGES_DATA.filter(image => image.display === "horizontal")
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
    const bigImages = IMAGE_PAGES_DATA.filter(image => image.display === "big")
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

    const allImages = [...normalImages, ...verticalImages, ...horizontalImages, ...bigImages].sort(() => Math.random() - 0.5);

    return allImages;
}

export default function ImagesSection() {
    const images = getRandomListOfImages();

    const style = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        gridGap: "5px",
        gridAutoRows: "75px",
        gridAutoFlow: "dense",
    }
    return (
        <div style={style}>
            {images.map((image: any) => (
                <ImageWrapper key={image.slug} imageUrl={image.imageUrl} slug={image.slug} display={image.display} />
            ))}
        </div>
    )
}

const ImageWrapper = ({ imageUrl, slug, display }: { imageUrl: string, slug: string, display: string }) => {
    let style = {};
    switch (display) {
        case "normal":
            break;
        case "vertical":
            style = {
                gridRow: "span 2",
            }
            break;
        case "horizontal":
            style = {
                gridColumn: "span 2",
            }
            break;
        case "big":
            style = {
                gridColumn: "span 2",
                gridRow: "span 2",
            }
            break;
    }

    return (
        <div style={style}>
            <Image src={imageUrl} alt="Generated Image" width={512} height={512} />
        </div>
    )
}