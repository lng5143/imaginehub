import { ChevronUp, CircleX } from "lucide-react";
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
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

export default function GenerationDetails({ }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentGenerationId, setCurrentGenerationId] = useCurrentGenerationId();

  const { data: response, isPending} = useQuery({
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
        <CircleX className="size-4 text-black hover:cursor-pointer" onClick={handleClose} />
      </div>
      <div 
        className="mb-auto overflow-y-auto p-5 flex flex-col gap-2 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-800" 
        ref={containerRef}>
        {!isPending && response?.data?.images.map((image, index) => (
          <Image 
            key={index} 
            src={image.url} 
            alt={response?.data?.prompt} 
            onClick={() => handleDialogOpen(index)}
            className="rounded-md hover:cursor-pointer hover:scale-105 transition-all duration-300 w-full shadow-lg"
            width={1000}
            height={1000}
            layout="responsive"
            priority
          />
        ))}
        {isPending && <Skeleton className="aspect-square w-full" />}
      </div>
      <div className="w-full flex items-center bg-indigo-950 text-white py-2 px-4 rounded-t-lg cursor-pointer" onClick={() => setIsDetailsOpen(true)}>
        <p className="flex-grow text-sm">View Details</p>
        <ChevronUp className="size-4" />
      </div>
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
        <DialogContent  className="p-0 m-0 border-none bg-transparent">
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
          </VisuallyHidden>
          <div className="">
            <CarouselWrapper selectedIndex={selectedImageIndex} images={response?.data?.images} />
          </div>
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
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="min-w-0" style={{ flex: '0 0 100%' }}>
              <Image 
                src={image.url} 
                alt={image.url} 
                className="w-full h-full rounded-md" 
                width={1000}
                height={1000}
                layout="responsive"
                priority
              />
            </div>
          ))}
        </div>
      </div>
      {currentIndex > 0 && (
        <Button 
          variant="ghost"
          onClick={scrollPrev} 
          className="absolute top-1/2 -left-20 transform -translate-y-1/2 text-white hover:text-black hover:bg-amber-500"
        >
          <CircleChevronLeft className="size-4" />
        </Button>
      )}
      {currentIndex < images.length - 1 && (
        <Button 
          variant="ghost"
          onClick={scrollNext} 
          className="absolute top-1/2 -right-20 transform -translate-y-1/2 text-white hover:text-black hover:bg-amber-500"
        >
          <CircleChevronRight className="size-4" />
        </Button>
      )}
    </div>
  )
}