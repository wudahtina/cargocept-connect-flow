import { useState } from "react";
import { Search, MapPin, Package, Truck, CheckCircle, Clock, User, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import deliveryTruck from "@/assets/delivery-truck.png";

const TrackShipment = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTracking = () => {
    if (!trackingNumber.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingData({
        trackingNumber: trackingNumber,
        status: "Out for Delivery",
        estimatedDelivery: "Today, 3:00 PM",
        origin: "London, UK",
        destination: "Birmingham, UK",
        courierName: "James Wilson",
        courierPhone: "+44 7123 456789",
        progress: 75,
        updates: [
          { status: "Package Picked Up", location: "London Depot", time: "9:00 AM", completed: true },
          { status: "In Transit", location: "Logistics Hub", time: "11:30 AM", completed: true },
          { status: "Out for Delivery", location: "Birmingham", time: "2:15 PM", completed: true },
          { status: "Delivered", location: "Destination", time: "Expected 3:00 PM", completed: false }
        ]
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] text-white">
        <div className="container-logistics">
          <div className="text-center space-y-6 fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Track Your Shipment
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
              Real-time tracking for complete visibility of your packages. 
              Stay informed every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Tracking Input */}
      <section className="py-16 bg-white">
        <div className="container-logistics">
          <Card className="max-w-2xl mx-auto shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-[hsl(var(--logistics-blue))] flex items-center justify-center">
                <Package className="mr-3 h-6 w-6" />
                Enter Tracking Number
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Enter your tracking number (e.g., CRG123456789)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="h-12 text-lg border-[hsl(var(--logistics-blue))]"
                  onKeyPress={(e) => e.key === 'Enter' && handleTracking()}
                />
                <Button 
                  variant="logistics" 
                  size="lg" 
                  onClick={handleTracking}
                  disabled={isLoading || !trackingNumber.trim()}
                  className="h-12 px-8"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Track
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-[hsl(var(--professional-gray))] text-center">
                Example tracking numbers: CRG123456789, CRG987654321, CRG555444333
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tracking Results */}
      {trackingData && (
        <section className="py-16 bg-[hsl(var(--professional-gray-lighter))]">
          <div className="container-logistics">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Tracking Info */}
              <div className="space-y-6 fade-in-up">
                <Card className="border-[hsl(var(--logistics-blue))] border-2">
                  <CardHeader>
                    <CardTitle className="text-xl text-[hsl(var(--logistics-blue))]">
                      Shipment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-[hsl(var(--professional-gray))]">Tracking Number</p>
                        <p className="font-semibold text-[hsl(var(--logistics-blue))]">{trackingData.trackingNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[hsl(var(--professional-gray))]">Status</p>
                        <p className="font-semibold text-[hsl(var(--delivery-orange))]">{trackingData.status}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[hsl(var(--professional-gray))]">From</p>
                        <p className="font-semibold">{trackingData.origin}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[hsl(var(--professional-gray))]">To</p>
                        <p className="font-semibold">{trackingData.destination}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-[hsl(var(--professional-gray-light))]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[hsl(var(--professional-gray))]">Expected Delivery</span>
                        <span className="font-semibold text-[hsl(var(--delivery-orange))]">{trackingData.estimatedDelivery}</span>
                      </div>
                      <div className="w-full bg-[hsl(var(--professional-gray-light))] rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${trackingData.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-[hsl(var(--professional-gray))] mt-2">
                        {trackingData.progress}% Complete
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Courier Info */}
                <Card className="bg-gradient-to-br from-[hsl(var(--logistics-blue-light))] to-[hsl(var(--delivery-orange-light))]">
                  <CardHeader>
                    <CardTitle className="text-xl text-[hsl(var(--logistics-blue))] flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Your Courier
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-full flex items-center justify-center text-white text-2xl">
                        👨‍💼
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[hsl(var(--logistics-blue))]">{trackingData.courierName}</h3>
                        <p className="text-sm text-[hsl(var(--professional-gray))]">Professional Courier</p>
                        <Button variant="outline" size="sm" className="mt-2 border-[hsl(var(--logistics-blue))] text-[hsl(var(--logistics-blue))]">
                          <Phone className="w-4 h-4 mr-1" />
                          {trackingData.courierPhone}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Animated Map & Timeline */}
              <div className="space-y-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
                {/* Animated Delivery Route */}
                <Card className="h-64 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--logistics-blue-light))] to-[hsl(var(--delivery-orange-light))]"></div>
                  <div className="relative h-full flex items-center justify-center">
                    <div className="w-full max-w-md">
                      {/* Route Line */}
                      <div className="relative h-2 bg-white/30 rounded-full mb-8">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-full transition-all duration-2000"
                          style={{ width: `${trackingData.progress}%` }}
                        ></div>
                      </div>
                      
                      {/* Origin and Destination */}
                      <div className="flex justify-between items-center">
                        <div className="text-center">
                          <MapPin className="w-6 h-6 text-[hsl(var(--logistics-blue))] mx-auto mb-1" />
                          <p className="text-sm font-medium">{trackingData.origin}</p>
                        </div>
                        
                        {/* Animated Truck */}
                        <div className="relative">
                          <img
                            src={deliveryTruck}
                            alt="Delivery Truck"
                            className="w-16 h-8 object-contain animate-pulse"
                          />
                        </div>
                        
                        <div className="text-center">
                          <MapPin className="w-6 h-6 text-[hsl(var(--delivery-orange))] mx-auto mb-1 animate-logistics-pulse" />
                          <p className="text-sm font-medium">{trackingData.destination}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Delivery Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-[hsl(var(--logistics-blue))]">
                      Delivery Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trackingData.updates.map((update: any, index: number) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            update.completed 
                              ? 'bg-[hsl(var(--delivery-orange))] text-white' 
                              : 'bg-[hsl(var(--professional-gray-light))] text-[hsl(var(--professional-gray))]'
                          }`}>
                            {update.completed ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Clock className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${
                              update.completed 
                                ? 'text-[hsl(var(--logistics-blue))]' 
                                : 'text-[hsl(var(--professional-gray))]'
                            }`}>
                              {update.status}
                            </h4>
                            <p className="text-sm text-[hsl(var(--professional-gray))]">
                              {update.location} • {update.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="py-16 bg-white">
        <div className="container-logistics">
          <div className="text-center space-y-6 fade-in-up">
            <h2 className="text-3xl font-bold text-[hsl(var(--logistics-blue))]">
              Need Help with Tracking?
            </h2>
            <p className="text-xl text-[hsl(var(--professional-gray))] max-w-2xl mx-auto">
              Our customer support team is available 24/7 to assist you with any tracking questions.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/contact">
                <Button variant="logistics">
                  Contact Support
                </Button>
              </Link>
              <Link to="/tracking-faq">
                <Button variant="outline" className="border-[hsl(var(--logistics-blue))] text-[hsl(var(--logistics-blue))]">
                  Tracking FAQ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrackShipment;