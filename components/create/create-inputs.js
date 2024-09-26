import ModelSelector from "./model-selector";
import { useCurrentModel } from "@/store/use-current-model";

export default function CreateInputs() {
  const [currentModel, setCurrentModel] = useCurrentModel();

  return (
    <div className="flex flex-col w-[360px] p-5">
        <ModelSelector />
    </div>
  );
}