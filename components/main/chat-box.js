import MessageBox from "./message-box";
import TypeBox from "./type-box";

export default function ChatBox() {
  return (
    <div className="basis-5/6 flex flex-col">
      <MessageBox />
      <TypeBox />
    </div>
  );
}