import { ChevronUp, CircleX, CircleChevronRight, CircleChevronLeft, Trash2 } from "lucide-react";
import { useCurrentGenerationId } from "@/store/use-current-generation-id";
import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import DetailsDrawer from "./details-drawer";
import useEmblaCarousel from "embla-carousel-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteGeneration, getGenerationDetails } from "@/server/actions/generations";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { useCurrentPage } from "@/store/use-current-page";
import ConfirmDialog from "../confirm-dialog";

export default function GenerationDetails({ }) {
  const queryClient = useQueryClient();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCarouselDialogOpen, setIsCarouselDialogOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentGenerationId, setCurrentGenerationId] = useCurrentGenerationId();
  const [currentPage, _setCurrentPage] = useCurrentPage();

  const { data: response, isPending: isPendingDetails} = useQuery({
    queryKey: ["generation", currentGenerationId],
    queryFn: () => getGenerationDetails(currentGenerationId)
  })

  console.log("response", response)

  const containerRef = useRef(null);

  const handleClose = () => {
    setCurrentGenerationId(null);
  };

  const handleCarouselDialogOpen = (index) => {
    setSelectedImageIndex(index);
    setIsCarouselDialogOpen(true);
  }

  const handleDeleteOptimisticUpdate = async () => {
    queryClient.setQueryData(["generations", currentPage], (old) => {
      if (!old) return;

      const deletedItem = old.data.find(item => item.id === currentGenerationId);
      if (deletedItem) {
        const newData = old.data.filter(item => item.id !== deletedItem.id);
        return { ...old, data: newData };
      }

      return old;
    });

    queryClient.invalidateQueries({ queryKey: ["generations", currentPage] });

    handleClose();
  }

  return (
    <div className="relative flex flex-col h-auto basis-1/3 bg-violet-100 shadow-xl">
      <div className="px-3 py-2 pb-0 flex items-center justify-end">
        <Button 
          variant="outline" 
          className="text-sm hover:bg-amber-500 hover:scale-105 hover:border-none transition-all duration-300" 
          onClick={() => setIsDeleteConfirmOpen(true)}
        >
          <Trash2 className="size-4 text-black" />
        </Button>
        <div className="flex-grow" />
        <CircleX className="size-4 text-black hover:cursor-pointer" onClick={handleClose} />
      </div>
      <div 
        className="overflow-y-auto p-3 flex flex-col gap-2 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-800" 
        ref={containerRef}
      >
        {!isPendingDetails && response?.data?.images.map((image, index) => (
          <Image 
            key={index} 
            src={image.url} 
            alt={response?.data?.prompt} 
            onClick={() => handleCarouselDialogOpen(index)}
            className="rounded-md hover:cursor-pointer hover:scale-[1.02] transition-all duration-300 w-full shadow-md"
            width={1000}
            height={1000}
            layout="responsive"
            priority
          />
        ))}
        {isPendingDetails && <Skeleton className="aspect-square w-full" />}
      </div>
      <div className="flex-grow" />
      <div className="w-full flex items-center bg-indigo-950 text-white py-2 px-4 rounded-t-lg cursor-pointer hover:h-10 transition-all duration-300" onClick={() => setIsDetailsOpen(true)}>
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
              <DetailsDrawer data={response?.data} isLoading={isPendingDetails} />
          </>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={isDeleteConfirmOpen}
        setOpen={setIsDeleteConfirmOpen}
        title="You are about to delete this generation"
        message="This action cannot be undone"
        confirmFn={() => deleteGeneration(currentGenerationId)}
        optimisticUpdateFn={handleDeleteOptimisticUpdate}
      />
      <Dialog className="p-0 m-0" open={isCarouselDialogOpen} onOpenChange={() => setIsCarouselDialogOpen()}>
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