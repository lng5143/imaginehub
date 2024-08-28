import ChatBox from "@/components/main/chat-box";
import ChatNav from "@/components/main/chat-nav";

export default function Home() {
  return (
    <div className="flex w-full h-full">
      <ChatNav />
      <ChatBox />
    </div>
  );
}