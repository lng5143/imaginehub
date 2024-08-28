import ChatBox from "@/components/main/chat-box";
import MessageBox from "@/components/main/message-box";

export default function Home() {
  return (
    <div className="flex w-full h-full">
      <MessageBox />
      <ChatBox />
    </div>
  );
}