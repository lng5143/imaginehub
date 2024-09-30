import { CircleX } from "lucide-react";
import { useCurrentGenerationId } from "@/store/use-current-generation-id";
import { useRef, useState, useEffect, useCallback, useTransition } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader,  } from "../ui/dialog";
import Image from "next/image";
import DetailsDrawer from "./details-drawer";
import useEmblaCarousel from "embla-carousel-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CircleChevronRight } from "lucide-react";
import { CircleChevronLeft } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const placeholderPrompt =
  "If you use a language different from English in you text prompts, pass the multi_lingual parameter with yes value in the request body. This will trigger an automatic language detection and translation during the processing of your request.";
const placeholderNegativePrompt =
  "If you use a language different from English in you text prompts";

const images = [
  { src: "/placeholder.", alt: "Image 1" },
  { src: "/placeholder.", alt: "Image 2" },
  { src: "/placeholder.", alt: "Image 3" },
  { src: "/placeholder.", alt: "Image 4" },
  { src: "/placeholder.", alt: "Image 5" },
  { src: "/placeholder.", alt: "Image 6" },
]

const calculateCols = (width) => {
  if (width > 1024) {
    return 3;
  } else if (width > 768) {
    return 2;
  } else {
    return 1;
  }
};

export default function GenerationDetails({ data }) {
  const [width, setWidth] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { _currentGenerationId, setCurrentGenerationId } =useCurrentGenerationId();

  const containerRef = useRef(null);

  const cols = calculateCols(width);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const handleClose = () => {
    setCurrentGenerationId(null);
  };

  const handleDialogOpen = (index) => {
    setSelectedImageIndex(index);
    setIsDialogOpen(true);
  }

  return (
    <div className="relative flex flex-col h-full">
      <div className="h-6 flex items-center justify-end p-1 absolute top-1 right-1">
        <CircleX className="size-4 text-gray-800" onClick={handleClose} />
      </div>
      <div 
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
        className="mb-auto overflow-y-auto p-5" 
        ref={containerRef}>
        {images.map((image, index) => (
          <Image key={index} src={image.src} alt={image.alt} width={200} height={200} onClick={() => handleDialogOpen(index)}/>
        ))}
      </div>
      <Button className="w-full" onClick={() => setIsDetailsOpen(true)}>
        View Details
      </Button>
      <AnimatePresence>
      {isDetailsOpen && (
        <>
          <motion.div
            className="h-full w-full absolute z-40 bg-gray-600/60"
            onClick={() => setIsDetailsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
            <DetailsDrawer data={data} />
        </>
      )}
      </AnimatePresence>

      <Dialog className="p-0 m-0" open={isDialogOpen} onOpenChange={() => setIsDialogOpen()}>
        <DialogContent className="p-0 m-0">
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
          </VisuallyHidden>
          <CarouselWrapper selectedIndex={selectedImageIndex} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CarouselWrapper({ selectedIndex }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(selectedIndex, true);
    }
  }, [emblaApi, selectedIndex]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
    setCurrentIndex(prev => prev - 1);
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    setCurrentIndex(prev => prev + 1);
  }, [emblaApi]);
  
  return (
    <div className="relative">
      <div ref={emblaRef} className=" overflow-hidden">
        <div className="flex">
          {images.map((image, index) => (
            <div className="min-w-0" style={{ flex: '0 0 100%' }}>
              {/* <Image className="" key={index} src={image.src} alt={image.alt} width={200} height={200}/> */}
              Slide {index}
            </div>
          ))}
        </div>
      </div>
      {currentIndex > 0 && (
        <Button 
          variant="ghost"
          onClick={scrollPrev} 
          className="absolute top-1/2 -left-20 transform -translate-y-1/2 text-gray-200 hover:text-gray-800"
        >
          <CircleChevronLeft className="size-4" />
      </Button>
      )}
      {currentIndex < images.length - 1 && (
        <Button 
          variant="ghost"
          onClick={scrollNext} 
          className="absolute top-1/2 -right-20 transform -translate-y-1/2 text-gray-200 hover:text-gray-800"
        >
          <CircleChevronRight className="size-4" />
        </Button>
      )}
    </div>
  )
}