import ModelSelector from "./model-selector";
import { useCurrentModel } from "@/store/use-current-model";
import DallEForm from "./dall-e-form";
import StableDiffusionForm from "./stable-diffusion-form";

export default function CreateInputs() {
  const [currentModel] = useCurrentModel();

  return (
    <div className="flex flex-col w-[360px] p-5 bg-gray-100 gap-10 h-auto">
        <ModelSelector />
        <div className="mt-auto">
            {currentModel === "dall-e-3" || currentModel === "dall-e-2" ? <DallEForm /> : null}
            {currentModel === "stable-diffusion" ? <StableDiffusionForm /> : null}
        </div>
    </div>
  );
}