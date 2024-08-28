import Message from "./chat/message";

export default function MessageBox() {
  return (
    <div className="grow">
      <ul className="flex flex-col gap-5">
          <Message message="Hello" isUser={true} />
          <Message message="Hello" isUser={false} />
          <Message message="Hello" isUser={true} />
          <Message message="Hello" isUser={false} />    
          <Message message="Hello" isUser={true} />
          <Message message="Hello" isUser={false} />
      </ul>
    </div>
  );
}