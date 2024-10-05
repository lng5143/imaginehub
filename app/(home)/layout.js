import HomeNavBar from "../_component/home-nav-bar";


export default function HomeLayout({ children }) {
  return (
    <div className="relative">
      <HomeNavBar />
      {children}
    </div>
  );
}