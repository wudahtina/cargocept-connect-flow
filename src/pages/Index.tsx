import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LiveTrackingWidget from "@/components/LiveTrackingWidget";
import DeliveryStats from "@/components/DeliveryStats";
import ServicesSection from "@/components/ServicesSection";
import OperationsShowcase from "@/components/OperationsShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Globe, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  { icon: Truck, title: "Express Delivery", desc: "Fast and reliable delivery across the UK and worldwide" },
  { icon: Globe, title: "Global Coverage", desc: "Shipping to 195+ countries with full customs support" },
  { icon: Shield, title: "Secure Handling", desc: "Your packages are protected with advanced security" },
  { icon: Clock, title: "Real-Time Tracking", desc: "Track your shipments every step of the way" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container-logistics">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Why Choose Cargocept</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Trusted by thousands of businesses and individuals for dependable shipping solutions.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-secondary/50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LiveTrackingWidget />
      <ServicesSection />
      <DeliveryStats />
      <OperationsShowcase />
      <TestimonialsSection />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container-logistics text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Ship?</h2>
            <p className="text-lg opacity-90 max-w-xl mx-auto">Book your shipment today and experience reliable, transparent logistics.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/book">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold h-14 px-8">
                  Book Shipment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/track">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold h-14 px-8">
                  Track Package
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
