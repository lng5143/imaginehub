import { CircleX } from "lucide-react";
import { useCurrentGenerationId } from "@/store/use-current-generation-id";
import { useRef, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const placeholderPrompt =
  "If you use a language different from English in you text prompts, pass the multi_lingual parameter with yes value in the request body. This will trigger an automatic language detection and translation during the processing of your request.";
const placeholderNegativePrompt =
  "If you use a language different from English in you text prompts";

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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const { _currentGenerationId, setCurrentGenerationId } =
    useCurrentGenerationId();

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

  return (
    <div className="relative flex flex-col h-full">
      <div className="h-6 flex items-center justify-end p-1 absolute top-1 right-1">
        <CircleX className="size-4 text-gray-800" onClick={handleClose} />
      </div>
      <div className="mb-auto overflow-y-auto p-5" ref={containerRef}>
        TODO: render images with real API data
      </div>
      <Button className="w-full" onClick={() => setIsOpen(true)}>
        View Details
      </Button>
      <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="h-full w-full absolute z-40 bg-gray-600/60"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
            <motion.div
              initial={{ y: "50%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 500 }}
              className="absolute z-50 bottom-0 h-2/3 flex flex-col gap-2 basis-1/5 bg-gray-200 p-5 text-sm rounded-t-lg"
            >
              <div className="flex">
                <div className="w-80 flex flex-col gap-2">
                  <p>Model name: Dall-E 3</p>
                  <p>Width: 1024</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p>Samples: 1</p>
                  <p>Height: 1024</p>
                </div>
              </div>

              {(data?.model === "dall-e-3" || data?.model === "dall-e-2") && (
                <div className="flex">
                  <p>Quality: Standard</p>
                </div>
              )}
              {/* {data?.model === "stable-diffusion" && ( */}
              <div className="flex flex-col gap-2">
                <div className="flex">
                  <div className="flex flex-col gap-2 w-80">
                    <p>Upscale: true</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Safety checker: true</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p>Negative Prompt</p>
                  <div className="w-full bg-gray-300 p-3 rounded-md shadow-md h-12 overflow-y-auto">
                    {placeholderNegativePrompt}
                  </div>
                </div>
              </div>
              {/* )} */}

              <div className="flex flex-col gap-2">
                <p>Prompt</p>
                <div className="w-full bg-gray-300 p-3 rounded-md shadow-md h-20 overflow-y-auto">
                  {placeholderPrompt}
                </div>
              </div>
            </motion.div>
        </>
      )}
      </AnimatePresence>
    </div>
  );
}
