import NavigationBar from "@/components/nav/nav-bar";

export default function CreateLayout({ children }) {
  return (
    <div>
      <NavigationBar />
      {children}
    </div>
  );
}