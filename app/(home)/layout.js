import CTASection from "@/components/landing-page/cta-section";
import HomeNavBar from "../_component/home-nav-bar";
import FooterSection from "@/components/landing-page/footer";


export default function HomeLayout({ children }) {
  return (
    <div className="relative">
      <HomeNavBar />
      {children}
      <CTASection />
      <FooterSection />
    </div>
  );
}