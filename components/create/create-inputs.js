import ModelSelector from "./model-selector.js";
import { useCurrentModel } from "@/store/use-current-model";
import DallEForm from "./dall-e-form";
import StabilityForm from "./stability-form";

export default function CreateInputs() {
  const [currentModel] = useCurrentModel();

  return (
    <div className="flex flex-col w-[360px] p-5 bg-violet-200 gap-10 h-auto overflow-y-auto">
        <ModelSelector />
        <div className="mt-auto">
            {currentModel.provider === "openai" ? <DallEForm /> : null}
            {currentModel.provider === "stability" ? <StabilityForm /> : null}
        </div>
    </div>
  );
}