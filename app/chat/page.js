'use client';

import ChatBox from "@/components/main/chat-box";
import ChatNav from "@/components/main/chat-nav";
import NavigationBar from "@/components/nav/nav-bar";
import Settings from "@/components/settings/settings";
import Modal from "@/components/modal";
import { useState } from "react";

export default function Chat() {
   const [showSettings, setShowSettings] = useState(false);

   const handleOpenSettings = () => {
      setShowSettings(true);
   }

   const handleCloseSettings = () => {
      setShowSettings(false);
   }

  return (
    <main>
      {showSettings && <Modal onClose={handleCloseSettings}><Settings /></Modal>}
      <NavigationBar onClickSettings={handleOpenSettings} />
      <div className="flex w-full h-full px-10 py-5">
        <ChatNav />
        <ChatBox />
      </div>
    </main>
  );
}