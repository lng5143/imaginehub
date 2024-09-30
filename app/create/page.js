"use client"

import { ResizablePanelGroup, ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import CreateInputs from "@/components/create/create-inputs";
import GenerationDetails from "@/components/create/generation-details";
import GenerationsPanel from "@/components/create/generations-panel";
import { useCurrentGenerationId } from "@/store/use-current-generation-id";

export default function CreatePage() {
  const [generationId, setGenerationId] = useCurrentGenerationId();

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
        {/* {generationId && ( */}
          <>
            <ResizableHandle className="bg-transparent" />
            <ResizablePanel
              minSize={30}
              className="bg-gray-100"
            >
              <GenerationDetails />
            </ResizablePanel>
          </>
        {/* )} */}
      </ResizablePanelGroup>
    </main>
  );
}