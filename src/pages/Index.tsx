import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LiveTrackingWidget from "@/components/LiveTrackingWidget";
import DeliveryStats from "@/components/DeliveryStats";
import ServicesSection from "@/components/ServicesSection";
import QuoteCalculator from "@/components/QuoteCalculator";
import CompanyMilestones from "@/components/CompanyMilestones";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <LiveTrackingWidget />
      <DeliveryStats />
      <ServicesSection />
      <QuoteCalculator />
      <CompanyMilestones />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
