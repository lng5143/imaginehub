export default function Message({ message, isUser }) {
  return (
    <li className={`w-fit ${isUser ? "bg-blue-500 self-end" : "bg-gray-500 self-start"}`}>
      <div >
        <h1>{message}</h1>
      </div>
    </li>
  );
}