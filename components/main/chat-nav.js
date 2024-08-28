import Conversation from "./conversation";

export default function ChatNav() {
  return (
    <div className="basis-1/6">
      <div>
        <p>New Conversation</p>
        <ul>
          <li>
            <Conversation conversation="Conversation 1" />
          </li>
        </ul>
      </div>
    </div>
  );
}