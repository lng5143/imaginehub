import NavigationBar from "@/components/nav/nav-bar";
import JotaiProvider from "@/components/jotai-provider";
export default function CreateLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <JotaiProvider>
        {children}
      </JotaiProvider>
    </div>
  );
}