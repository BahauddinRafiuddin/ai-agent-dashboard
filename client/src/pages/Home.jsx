import React from "react";
import MainBanner from "../components/MainBanner";
import AgentFeatures from "../components/AgentFeatures";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="mt-3 overflow-y-auto">
      <MainBanner />
      <AgentFeatures/>
      <HowItWorks/>
      <Testimonials/>
      <CTASection/>
      <Footer/>
    </div>
  );
};

export default Home;
