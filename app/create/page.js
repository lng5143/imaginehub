'use client';

import { useState } from "react";
import { ResizablePanelGroup, ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import CreateInputs from "@/components/create/create-inputs";
import GenerationDetails from "@/components/create/generation-details";
import GenerationsPanel from "@/components/create/generations";

export default function Chat() {
  const [generationId, setGenerationId] = useState();

  return (
    <main className="flex h-screen">
      <CreateInputs />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <GenerationsPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <GenerationDetails />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}