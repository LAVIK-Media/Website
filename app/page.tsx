import IntroAnimation from "@/components/intro/IntroAnimation";
import HeroCinematic from "@/components/sections/HeroCinematic";
import TrustStrip from "@/components/sections/TrustStrip";
import TransformationExperience from "@/components/sections/TransformationExperience";
import WhyLavik from "@/components/sections/WhyLavik";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import SeoMaintenance from "@/components/sections/SeoMaintenance";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <IntroAnimation>
      <HeroCinematic />
      <TrustStrip />
      <TransformationExperience />
      <WhyLavik />
      <Process />
      <Portfolio />
      <SeoMaintenance />
      <FAQ />
      <FinalCTA />
      <Contact />
    </IntroAnimation>
  );
}
