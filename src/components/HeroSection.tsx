import { useState } from "react";
import { Search, Package, Truck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import heroBanner from "@/assets/hero-banner-dhl-style.jpg";

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
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBanner})`
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center text-white">
        {/* Main Tracking Section */}
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-4xl lg:text-6xl font-bold">
            Track Your Shipment
          </h1>
          
          <p className="text-lg lg:text-xl opacity-90">
            Enter your tracking number(s)
          </p>

          {/* Tracking Input */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="text"
              placeholder="Enter your tracking number(s)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="bg-white text-gray-900 border-0 h-14 text-lg flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
            />
            <Button 
              onClick={handleTrack}
              className="h-14 px-8 bg-[hsl(var(--dhl-red))] hover:bg-[hsl(var(--dhl-red))]/90 text-white font-semibold text-lg"
            >
              Track
            </Button>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 text-center space-y-4 text-gray-900 hover:bg-white transition-colors">
            <div className="w-16 h-16 bg-[hsl(var(--dhl-red))] rounded-full flex items-center justify-center mx-auto">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Ship Now</h3>
            <p className="text-gray-600">Find the right service</p>
            <Button 
              onClick={handleCreateShipment}
              variant="outline" 
              className="w-full border-[hsl(var(--dhl-red))] text-[hsl(var(--dhl-red))] hover:bg-[hsl(var(--dhl-red))] hover:text-white"
            >
              Ship Now
            </Button>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 text-center space-y-4 text-gray-900 hover:bg-white transition-colors">
            <div className="w-16 h-16 bg-[hsl(var(--dhl-red))] rounded-full flex items-center justify-center mx-auto">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Get a Quote</h3>
            <p className="text-gray-600">Estimate cost to share and compare</p>
            <Button 
              onClick={handleGetQuote}
              variant="outline" 
              className="w-full border-[hsl(var(--dhl-red))] text-[hsl(var(--dhl-red))] hover:bg-[hsl(var(--dhl-red))] hover:text-white"
            >
              Get Quote
            </Button>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 text-center space-y-4 text-gray-900 hover:bg-white transition-colors">
            <div className="w-16 h-16 bg-[hsl(var(--dhl-red))] rounded-full flex items-center justify-center mx-auto">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Request a Business Account</h3>
            <p className="text-gray-600">Shipping regularly or frequently? Learn about volume discounts</p>
            <Button 
              onClick={() => navigate("/contact")}
              variant="outline" 
              className="w-full border-[hsl(var(--dhl-red))] text-[hsl(var(--dhl-red))] hover:bg-[hsl(var(--dhl-red))] hover:text-white"
            >
              Request Account
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;