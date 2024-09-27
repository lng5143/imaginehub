import { CircleX } from "lucide-react";
import { useCurrentGenerationId } from "@/store/use-current-generation-id";
import { useRef, useState, useEffect } from "react";

  const calculateCols = (width, imageWidth, imageHeight) => {
    const ratio = imageWidth / imageHeight;
    
    if (width > 1280) {
      if (ratio > 2) {
        return 2;
      } else return 3;
    }
    else if (width > 768) {
      if (ratio > 2) {
        return 1;
      } else if (ratio > 0.5) {
        return 2;
      } else return 3;
    } else {
      if (ratio > 0.5) {
        return 1;
      } else return 2;
    }
  }

 export default function GenerationDetails({ data }) {
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);
  const { _currentGenerationId, setCurrentGenerationId } = useCurrentGenerationId();

  const cols = calculateCols(width, data?.width, data?.height);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    }

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [data]);

  const handleClose = () => {
    setCurrentGenerationId(null);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="h-6 flex items-center justify-end p-1">
        <CircleX className="size-4 text-gray-800" onClick={handleClose} />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="basis-5/6 overflow-y-auto" ref={containerRef}>
          
        </div>
        <div className="basis-1/6 bg-gray-200">

        </div>
      </div>
    </div>
  );
}