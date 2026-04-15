import { useState } from "react";
import { Search, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import cargoceptTruck from "@/assets/cargocept-highway-truck.jpg";

const HeroSection = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const navigate = useNavigate();

  const handleTrack = () => {
    if (trackingNumber.trim()) navigate(`/track?id=${trackingNumber.trim()}`);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${cargoceptTruck})` }}
      />

      <div className="relative z-10 container mx-auto px-4 py-24 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Reliable Global
            <span className="block text-[hsl(var(--dhl-yellow))]">Shipping Solutions</span>
          </h1>
          <p className="text-lg lg:text-xl opacity-95 max-w-2xl mx-auto leading-relaxed">
            Fast, secure, and dependable logistics services — delivering your packages worldwide with real-time tracking and complete transparency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button
              onClick={() => navigate("/book")}
              size="lg"
              className="h-14 px-8 bg-[hsl(var(--dhl-red))] hover:bg-[hsl(var(--dhl-red))]/90 text-white font-bold text-lg w-full sm:w-auto"
            >
              <Package className="mr-2 h-5 w-5" />
              Book Shipment
            </Button>
            <Button
              onClick={() => navigate("/track")}
              variant="outline"
              size="lg"
              className="h-14 px-8 border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-lg w-full sm:w-auto"
            >
              <Search className="mr-2 h-5 w-5" />
              Track Package
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-xl mx-auto mt-12"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-2xl">
            <h3 className="text-primary font-bold text-base mb-3">Quick Track</h3>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter tracking number (e.g., CG001287463)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="bg-white text-foreground border-primary h-12 text-base flex-1"
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              />
              <Button onClick={handleTrack} className="h-12 px-6 bg-[hsl(var(--dhl-red))] hover:bg-[hsl(var(--dhl-red))]/90 text-white font-semibold">
                Track <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
