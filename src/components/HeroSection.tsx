import { useState } from "react";
import { Search, Package, Truck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import cargoceptTruck from "@/assets/cargocept-highway-truck.jpg";

const HeroSection = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const navigate = useNavigate();

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      navigate("/track");
    }
  };

  const handleGetQuote = () => {
    navigate("/create-shipment");
  };

  const handleCreateShipment = () => {
    navigate("/create-shipment");
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${cargoceptTruck})`
        }}
      >
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 text-center text-white">
        {/* Main Hero Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Global Logistics
              <span className="block text-[hsl(var(--dhl-yellow))]">Excellence</span>
            </h1>
            
            <p className="text-xl lg:text-2xl opacity-95 max-w-2xl mx-auto leading-relaxed">
              Experience world-class shipping with real-time tracking, express delivery, and 99.9% reliability across 195+ countries
            </p>
          </div>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <Button 
              onClick={handleCreateShipment}
              size="lg"
              className="h-16 px-8 bg-[hsl(var(--dhl-red))] hover:bg-[hsl(var(--dhl-red))]/90 text-white font-bold text-lg w-full sm:w-auto"
            >
              <Package className="mr-2 h-5 w-5" />
              Ship Now
            </Button>
            <Button 
              onClick={() => navigate("/track")}
              variant="outline"
              size="lg"
              className="h-16 px-8 border-2 border-white text-white hover:bg-white hover:text-[hsl(var(--logistics-blue))] font-bold text-lg w-full sm:w-auto"
            >
              <Search className="mr-2 h-5 w-5" />
              Track Package
            </Button>
          </div>
        </div>

        {/* Quick Tracking Bar */}
        <div className="max-w-2xl mx-auto mt-16">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
            <h3 className="text-[hsl(var(--logistics-blue))] font-bold text-lg mb-4">Quick Track</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="Enter tracking number (e.g., CG001287463)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="bg-white text-gray-900 border-[hsl(var(--logistics-blue))] h-12 text-base flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              />
              <Button 
                onClick={handleTrack}
                className="h-12 px-6 bg-[hsl(var(--dhl-red))] hover:bg-[hsl(var(--dhl-red))]/90 text-white font-semibold"
              >
                Track
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-[hsl(var(--dhl-yellow))]">50M+</div>
            <div className="text-sm opacity-90">Packages Delivered</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-[hsl(var(--dhl-yellow))]">195+</div>
            <div className="text-sm opacity-90">Countries</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-[hsl(var(--dhl-yellow))]">99.9%</div>
            <div className="text-sm opacity-90">Reliability</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-[hsl(var(--dhl-yellow))]">24/7</div>
            <div className="text-sm opacity-90">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;