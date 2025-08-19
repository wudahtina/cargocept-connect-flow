import { useState } from "react";
import { Search, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import deliveryTruck from "@/assets/delivery-truck.png";

const HeroSection = () => {
  const [trackingNumber, setTrackingNumber] = useState("");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--logistics-blue))] via-[hsl(var(--logistics-blue-dark))] to-[hsl(var(--delivery-orange))] text-white">
      <div className="container-logistics py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 fade-in-up">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Cargocept: Your Trusted
                <span className="block text-[hsl(var(--delivery-orange))]">
                  Logistics Partner
                </span>
              </h1>
              <p className="text-xl lg:text-2xl opacity-90">
                Fast, reliable, and secure delivery solutions worldwide. 
                Track your packages in real-time and experience logistics excellence.
              </p>
            </div>

            {/* Tracking Input */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Track Your Package
              </h3>
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Enter tracking number..."
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="bg-white text-[hsl(var(--professional-gray))] border-0 h-12"
                />
                <Button variant="delivery" size="lg" className="h-12 px-8">
                  <Search className="mr-2 h-4 w-4" />
                  Track Now
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-4">
              <Button variant="delivery" size="lg">
                Get a Quote
              </Button>
              <Button variant="tracking" size="lg">
                Create Shipment
              </Button>
            </div>
          </div>

          {/* Animation Area */}
          <div className="relative lg:h-96 h-64">
            {/* Animated Delivery Route */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-1 bg-white/20 rounded-full relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--delivery-orange))] to-[hsl(var(--delivery-orange-dark))] rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Animated Truck */}
            <div className="absolute top-1/2 transform -translate-y-1/2 w-24 h-12">
              <img
                src={deliveryTruck}
                alt="Delivery Truck"
                className="w-full h-full object-contain animate-delivery-truck"
              />
            </div>

            {/* Destination Points */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-4 h-4 bg-[hsl(var(--delivery-orange))] rounded-full animate-logistics-pulse"></div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-4 h-4 bg-[hsl(var(--delivery-orange))] rounded-full animate-logistics-pulse"></div>
          </div>
        </div>

        {/* Features Row */}
        <div className="grid md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-white/20">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Fast Delivery</h3>
            <p className="text-sm opacity-80">Express shipping worldwide</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <Package className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Real-time Tracking</h3>
            <p className="text-sm opacity-80">Track packages 24/7</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Global Network</h3>
            <p className="text-sm opacity-80">Worldwide coverage</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Secure Shipping</h3>
            <p className="text-sm opacity-80">Safe and insured</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;