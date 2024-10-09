import Generation from "./generation";
import { useRef, useState, useEffect } from "react";
import PaginationContainer from "./pagination";
import { useCurrentGenerationId } from "@/store/use-current-generation-id";
import { useQuery } from "@tanstack/react-query";
import { getGenerations } from "@/server/actions/generations";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_SIZE } from "@/const/imagine-box-consts";

const countCols = (width) => {
  if (width > 1200) {
    return 8;
  } else if (width > 800) {
    return 6;
  } else if (width > 400) {
    return 4;
  } else {
    return 2;
  }
}

export default function GenerationsPanel({}) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [_currentGenerationId, setCurrentGenerationId] = useCurrentGenerationId();

  const { data: response, isError, isPending } = useQuery({
    queryKey: ["generations", currentPage],
    queryFn: async () => {
      return await getGenerations(currentPage);
    },
    keepPreviousData: true
  })

  let cols = countCols(width);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    }

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

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
    <div className="flex flex-col gap-10 h-full p-2">
      <div 
        style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "10px" }} 
        ref={containerRef} 
        className="mb-auto p-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-800"
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