"use client"

import { ResizablePanelGroup, ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import CreateInputs from "@/components/create/create-inputs";
import GenerationDetails from "@/components/create/generation-details";
import GenerationsPanel from "@/components/create/generations-panel";
import { useCurrentGenerationId } from "@/store/use-current-generation-id";

export default function CreatePage() {
  const [generationId, _setGenerationId] = useCurrentGenerationId();

  return (
    <main className="flex h-screen">
      <CreateInputs />
      <ResizablePanelGroup 
        direction="horizontal"
      >
        <ResizablePanel
          minSize={30}
          >
          <GenerationsPanel />
        </ResizablePanel>
        {generationId && (
          <>
            <ResizableHandle className="bg-transparent" />
            <ResizablePanel
              minSize={30}
              className="bg-indigo-100"
              style={{ boxShadow: '-4px 0 6px 1px rgba(0, 0, 0, 0.2)' }}
            >
              <GenerationDetails />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </main>
  );
}