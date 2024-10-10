import Generation from "./generation";
import { useRef, useState, useEffect } from "react";
import PaginationContainer from "./pagination";
import { useCurrentGenerationId } from "@/store/use-current-generation-id";
import { useQuery } from "@tanstack/react-query";
import { getGenerations } from "@/server/actions/generations";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_SIZE } from "@/const/imagine-box-consts";
import { cn } from "@/lib/utils";
import { useCurrentPage } from "@/store/use-current-page";
export default function GenerationsPanel({}) {
  console.log("GenerationsPanel");
  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useCurrentPage();
  const [currentGenerationId, setCurrentGenerationId] = useCurrentGenerationId();

  const { data: response, isError, isPending } = useQuery({
    queryKey: ["generations", currentPage],
    queryFn: async () => {
      return await getGenerations(currentPage);
    },
    keepPreviousData: true
  })

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const handleSelectGeneration = (generation) => {
    if (generation.status === "PROCESSING")
      toast.info("Image generation in progress");
    else if (generation.status === "SUCCESS")
      setCurrentGenerationId(generation.id);
  }
  
  return (
    <div className={cn("flex flex-col gap-10 h-full p-2", currentGenerationId ? "basis-2/3" : "basis-full")}>
      <div 
        ref={containerRef} 
        className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6 mb-auto p-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-800"
      >
        {!isPending && response?.data?.map(generation => (
          <Generation key={generation.id} data={generation} onClick={() => handleSelectGeneration(generation)}/>
        ))}
        {isPending && Array.from({length: PAGE_SIZE}).map((_, index) => (
          <Skeleton key={index} className="aspect-square" />
        ))}
      </div>
      <div className="pb-4">
        <PaginationContainer 
          currentPage={currentPage}
          totalCount={response?.totalCount}
          onPageChange={page => handlePageChange(page)}
        />
      </div>
    </div>
  );
}