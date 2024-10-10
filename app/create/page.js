"use client"

import CreateInputs from "@/components/create/create-inputs";
import GenerationDetails from "@/components/create/generation-details";
import GenerationsPanel from "@/components/create/generations-panel";
import { useCurrentGenerationId } from "@/store/use-current-generation-id";

export default function CreatePage() {
  const [generationId, _setGenerationId] = useCurrentGenerationId();

  return (
    <main className="flex h-screen">
      <CreateInputs />
      <div className="flex">
        <GenerationsPanel />
        {generationId && (
          <GenerationDetails />
        )}
      </div>
    </main>
  );
}