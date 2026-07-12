import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import StatsRow from "@/components/StatsRow";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import About from "@/components/About";
import Blog from "@/components/Blog";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SocialProof />
      <StatsRow />
      <Services />
      <Process />
      <Testimonials />
      <CaseStudies />
      <About />
      <Blog />
      <Cta />
      <Footer />
    </main>
  );
}
