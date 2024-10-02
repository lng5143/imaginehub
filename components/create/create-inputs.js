import ModelSelector from "./model-selector";
import { useCurrentModel } from "@/store/use-current-model";
import DallEForm from "./dall-e-form";
import StabilityForm from "./stability-form";
import { getProvider } from "@/lib/utils";

export default function CreateInputs() {
  const [currentModel] = useCurrentModel();

  const provider = getProvider(currentModel);
  console.log(currentModel);
  console.log(provider);

  return (
    <div className="flex flex-col w-[360px] p-5 bg-gray-100 gap-10 h-auto">
        <ModelSelector />
        <div className="mt-auto">
            {provider === "openai" ? <DallEForm /> : null}
            {provider === "stability" ? <StabilityForm /> : null}
        </div>
    </div>
  );
}