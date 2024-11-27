import { motion } from "framer-motion"
import { LoaderCircleIcon } from "lucide-react"
import { getModelName } from "@/lib/models"
import { FLUXGenerationConfigs, Image, ImageGeneration, OpenAIGenerationConfigs, StabilityGenerationConfigs } from "@prisma/client"
import { Accordion, AccordionTrigger, AccordionContent, AccordionItem } from "../ui/accordion"

interface DetailsDrawerProps {
  data: ImageGeneration & { 
    images: Image[], 
    openAIGenerationConfigs: OpenAIGenerationConfigs | null, 
    stabilityGenerationConfigs: StabilityGenerationConfigs | null,
    fluxGenerationConfigs: FLUXGenerationConfigs | null
  },
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
              <p><span className="font-bold">Model:</span> {getModelName(data.model)}</p>
              <p><span className="font-bold">Samples:</span> {data?.images?.length}</p> 

              <AdvancedSettingDetails data={data} />
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

interface AdvancedSettingDetailsProps {
    data: ImageGeneration & { 
        openAIGenerationConfigs: OpenAIGenerationConfigs | null, 
        stabilityGenerationConfigs: StabilityGenerationConfigs | null,
        fluxGenerationConfigs: FLUXGenerationConfigs | null
    }
}

const AdvancedSettingDetails = ({ data }: AdvancedSettingDetailsProps) => {
    let configs: OpenAIGenerationConfigs | StabilityGenerationConfigs | FLUXGenerationConfigs | {} = {};  // Default value

    if (data.openAIGenerationConfigs) {
        configs = data.openAIGenerationConfigs;
    }
    if (data.stabilityGenerationConfigs) {
        configs = data.stabilityGenerationConfigs;
    }
    if (data.fluxGenerationConfigs) {
        configs = data.fluxGenerationConfigs;
    }

    return (
      <div className="flex flex-col gap-2">
        <p className="font-bold">Advanced Settings:</p>
        <div className="flex flex-col gap-2 bg-white p-2 rounded-sm">
          {Object.entries(configs)
              .filter(([key, value]) => {
                  const excludedFields = ['id', 'imageGenerationId', 'createdAt', 'updatedAt', 'model'];
                  return !excludedFields.includes(key) && 
                        value !== null && 
                        value !== '' &&
                        !(typeof value === 'object' && Object.keys(value).length === 0);
              })
              .map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                      <div className="flex gap-2">
                          <span className="capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="text-gray-700">
                              {typeof value === 'object' ? JSON.stringify(value, null, 2) : value?.toString()}
                          </span>
                      </div>
                  </div>
                ))}
            </div>
        </div>
    )
}