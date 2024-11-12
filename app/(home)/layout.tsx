import CTASection from "@/components/landing-page/cta-section";
import FooterSection from "@/components/landing-page/footer";
import NavBar from "../_component/nav-bar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children } : HomeLayoutProps) {
  return (
    <div className="relative">
      <NavBar />
      {children}
      <CTASection />
      <FooterSection />
    </div>
  );
}