import { CircleX } from "lucide-react";
import { useCurrentGenerationId } from "@/store/use-current-generation-id";
import { useRef, useState, useEffect, useCallback, useTransition } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader,  } from "../ui/dialog";
import DetailsDrawer from "./details-drawer";
import useEmblaCarousel from "embla-carousel-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CircleChevronRight } from "lucide-react";
import { CircleChevronLeft } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useQuery } from "@tanstack/react-query";
import { getGenerationDetails } from "@/server/actions/generations";

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

export default function GenerationDetails({ }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentGenerationId, setCurrentGenerationId] = useCurrentGenerationId();

  const { data: response, isLoading} = useQuery({
    queryKey: ["generation", currentGenerationId],
    queryFn: () => getGenerationDetails(currentGenerationId)
  })

  console.log(response)

  const containerRef = useRef(null);

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
        <CircleX className="size-4 text-gray-800 hover:cursor-pointer" onClick={handleClose} />
      </div>
      <div 
        className="mb-auto overflow-y-auto p-5" 
        ref={containerRef}>
        {response?.data?.images.map((image, index) => (
          <img 
            key={index} 
            src={image.url} 
            alt={response?.data?.prompt} 
            onClick={() => handleDialogOpen(index)}
            className="aspect-square rounded-md hover:cursor-pointer hover:scale-105 transition-all duration-300 w-full shadow-md"
          />
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
            <DetailsDrawer data={response?.data} />
        </>
      )}
      </AnimatePresence>

      <Dialog className="p-0 m-0" open={isDialogOpen} onOpenChange={() => setIsDialogOpen()}>
        <DialogContent className="p-0 m-0 border-none">
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
          </VisuallyHidden>
          <CarouselWrapper selectedIndex={selectedImageIndex} images={response?.data?.images} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CarouselWrapper({ selectedIndex, images }) {
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
    <div className="relative bg-transparent">
      <div ref={emblaRef} className=" overflow-hidden bg-transparent">
        <div className="flex bg-transparent">
          {images.map((image, index) => (
              <img src={image.url} alt={image.url} className="w-full h-full object-cover rounded-md" />
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