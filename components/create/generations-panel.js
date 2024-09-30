import Generation from "./generation";
import { useRef, useState, useEffect } from "react";
import PaginationContainer from "./pagination";
import { useCurrentGenerationId } from "@/store/use-current-generation-id";
import { useQuery } from "@tanstack/react-query";
import { getGenerations } from "@/actions/generations";

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

  const { data: response, isError, isLoading, isPending } = useQuery({
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
  
  return (
    <div className="flex flex-col gap-10 p-5 h-full">
      <div 
        style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "10px" }} 
        ref={containerRef} 
        className="mb-auto"
      >
        {/* {response?.data.map(generation => (
          <Generation key={generation.id} thumbnail={generation.thumbnail} count={generation.count} onClick={() => setCurrentGenerationId(generation.id)}/>
        ))} */}
        {JSON.stringify(response)}
        {/* <Generation thumbnail="/placeholder.png" count={1} onClick={() => setCurrentGenerationId(1)}/>
        <Generation thumbnail="/placeholder.png" count={2} />
        <Generation thumbnail="/placeholder.png" count={3} />
        <Generation thumbnail="/placeholder.png" count={1} /> */}
      </div>
      <div>
        <PaginationContainer 
          currentPage={currentPage}
          total={response?.totalCount}
          onClick={page => handlePageChange(page)}
        />
      </div>
      </div>
  );
}