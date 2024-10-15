"use client"

import CreateInputs from "@/components/create/create-inputs";
import GenerationDetails from "@/components/create/generation-details";
import GenerationsPanel from "@/components/create/generations-panel";
import useCurrentUserId from "@/hooks/use-current-user-id";
import { useCurrentGenerationId } from "@/store/use-current-generation-id";

export default function CreatePage() {
  const [generationId, _setGenerationId] = useCurrentGenerationId();
  const userId = useCurrentUserId();

  return (
    <main className="flex h-screen">
      <CreateInputs />
      <div className="flex w-full">
        {userId && (
          <>
            <GenerationsPanel />
            {generationId && <GenerationDetails />}
          </>
        )}
      </div>
    </main>
  );
}