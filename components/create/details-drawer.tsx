import { motion } from "framer-motion"
import { Textarea } from "../ui/textarea"
import { LoaderCircleIcon } from "lucide-react"
import { getModelName } from "@/lib/models"
import { Image, ImageGeneration, OpenAIGenerationConfigs, StabilityGenerationConfigs } from "@prisma/client"
import { Accordion, AccordionTrigger } from "@radix-ui/react-accordion"
import { AccordionContent, AccordionItem } from "../ui/accordion"

interface DetailsDrawerProps {
  data: ImageGeneration & { 
    images: Image[], 
    openAIGenerationConfigs: OpenAIGenerationConfigs | null, 
    stabilityGenerationConfigs: StabilityGenerationConfigs | null,
    fluxGenerationConfigs: any
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
              <p><span className="font-bold">Status:</span> {data?.status}</p>
              <p><span className="font-bold">Samples:</span> {data?.images?.length}</p> 

              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  {data?.openAIGenerationConfigs && (
                    <>
                      <AccordionTrigger>DALL-E Generation Configs</AccordionTrigger>
                      <AccordionContent>
                        <p><span className="font-bold">Quality:</span> {data?.openAIGenerationConfigs.quality || ""}</p>
                        <p><span className="font-bold">Size:</span> {data?.openAIGenerationConfigs.size || ""}</p>
                      </AccordionContent>
                    </>
                  )}

                  {data?.stabilityGenerationConfigs && (
                    <>
                      <AccordionTrigger>Stability AI Generation Configs</AccordionTrigger>
                      <AccordionContent>
                        <p><span className="font-bold">Aspect Ratio:</span> {data?.stabilityGenerationConfigs.aspectRatio || ""}</p>
                        <p><span className="font-bold">Style Preset:</span> {data?.stabilityGenerationConfigs.stylePreset || ""}</p>
                        <p><span className="font-bold">Seed:</span> {data?.stabilityGenerationConfigs.seed || ""}</p>
                        <div className="flex flex-col gap-1">
                          <p className="font-bold">Negative Prompt:</p>
                          <Textarea
                            value={data?.stabilityGenerationConfigs.negativePrompt || ""}
                            className="w-full bg-white mx-2 shadow-lg min-h-[50px] h-fit"
                            readOnly
                          />
                        </div>
                      </AccordionContent>
                    </>
                  )}

                  {data?.fluxGenerationConfigs && (
                    <>
                      <AccordionTrigger>FLUX Generation Configs</AccordionTrigger>
                      <AccordionContent>
                        <p><span className="font-bold">Width:</span> {data?.fluxGenerationConfigs.width}</p>
                        <p><span className="font-bold">Height:</span> {data?.fluxGenerationConfigs.height}</p>
                        <p><span className="font-bold">Prompt Upsampling:</span> {data?.fluxGenerationConfigs.prompt_upsampling?.toString() || ""}</p>
                        <p><span className="font-bold">Seed:</span> {data?.fluxGenerationConfigs.seed || ""}</p>
                        <p><span className="font-bold">Safety Tolerance:</span> {data?.fluxGenerationConfigs.safety_tolerance || ""}</p>
                        <p><span className="font-bold">Steps:</span> {data?.fluxGenerationConfigs.steps || ""}</p>
                        <p><span className="font-bold">Guidance:</span> {data?.fluxGenerationConfigs.guidance || ""}</p>
                        <p><span className="font-bold">Interval:</span> {data?.fluxGenerationConfigs.interval || ""}</p>
                        <p><span className="font-bold">Raw:</span> {data?.fluxGenerationConfigs.raw?.toString() || ""}</p>
                      </AccordionContent>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
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