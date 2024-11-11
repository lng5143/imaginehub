import { MODELS } from "@/const/consts"
import { motion } from "framer-motion"
import { Textarea } from "../ui/textarea"
import { LoaderCircleIcon } from "lucide-react"

interface DetailsDrawerProps {
  data: any,
  isLoading: boolean
}

export default function DetailsDrawer({ data, isLoading }: DetailsDrawerProps) {
    return (
        <motion.div
          initial={{ y: "50%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 500 }}
          className="absolute z-50 bottom-0 h-2/3 flex flex-col gap-5 basis-1/5 bg-gray-200 p-5 text-sm rounded-t-lg w-full"
        >
          <h2 className="text-lg font-bold">Generation Details</h2>
          {!isLoading && 
            (<div className="flex flex-col gap-3">
              <p><span className="font-bold">Model:</span> {MODELS.find(model => model.code === data?.model)?.name}</p>
              <p><span className="font-bold">Status:</span> {data?.status}</p>
              <p><span className="font-bold">Samples:</span> {data?.images?.length}</p> 
              {data?.de_quality && <p><span className="font-bold">Quality:</span> {data?.de_quality}</p>}
              {data?.de_size && <p><span className="font-bold">Size:</span> {data?.de_size}</p>}
              {data?.sd_aspectRatio && <p><span className="font-bold">Aspect Ratio:</span> {data?.sd_aspectRatio}</p>}
              {data?.sd_seed && <p><span className="font-bold">Seed:</span> {data?.sd_seed}</p>}
              {data?.sd_stylePreset && <p><span className="font-bold">Style Preset:</span> {data?.sd_stylePreset}</p>}
              {data?.negative_prompt && (
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Negative Prompt:</p>
                  <Textarea
                    value={data?.negative_prompt}
                    className="w-full bg-white mx-2 shadow-lg min-h-[50px] h-fit"
                    readOnly
                  />
                </div>
              )}
              {data?.prompt && (
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Prompt:</p>
                  <Textarea
                    value={data?.prompt}
                    className="w-full bg-white mx-2 shadow-lg min-h-[50px] h-fit"
                    readOnly
                  />
                </div>
              )}
            </div>
          )}
          {isLoading && 
            <div className="flex justify-center items-center h-full">
              <LoaderCircleIcon className="animate-spin" size={20} />
            </div>
          }
        </motion.div>
    )
}