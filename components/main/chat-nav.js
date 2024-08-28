import Conversation from "./conversation";

export default function ChatNav() {
  return (
    <div className="basis-1/6">
      <div>
        <ul className="flex flex-col gap-2">
            <li>
                <p>New Conversation</p>
            </li>
            <Conversation conversation="Conversation 1" />
            <Conversation conversation="Conversation 2" />
            <Conversation conversation="Conversation 3" />
        </ul>
      </div>
    </div>
  );
}