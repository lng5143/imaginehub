import ModelSelector from "./model-selector";
import { useCurrentModel } from "@/store/use-current-model";
import CreateFormWrapper from "./create-form-wrapper";

export default function CreateInputs() {
  return (
    <div className="flex flex-col w-[360px] p-5 bg-violet-200 gap-10 h-auto overflow-y-auto">
        <ModelSelector />
        <div className="mt-auto">
            <CreateFormWrapper />
        </div>
    </div>
  );
}