import Generation from "./generation";

export default function GenerationsPanel({}) {
  return (
      <div className="flex gap-4 flex- ">
        <Generation image="/placeholder.png" count={1} />
        <Generation image="/placeholder.png" count={2} />
        <Generation image="/placeholder.png" count={3} />
        <Generation image="/placeholder.png" count={1} />
      </div>
  );
}