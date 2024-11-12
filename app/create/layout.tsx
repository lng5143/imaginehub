"use client"

import NavigationBar from "@/components/nav/nav-bar";

interface CreateLayoutProps {
  children: React.ReactNode;
}

export default function CreateLayout({ children } : CreateLayoutProps) {
  return (
      <div className="flex flex-col h-screen">
        <NavigationBar />
          {children}
      </div>
  );
}