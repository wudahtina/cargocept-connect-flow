import { useState, useEffect } from "react";
import { MapPin, Clock, Package2, Truck, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LiveTrackingWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const liveShipments = [
    {
      id: "CG001287463",
      from: "New York, NY",
      to: "Los Angeles, CA",
      status: "In Transit",
      location: "Denver, CO",
      progress: 60,
      eta: "2 hours",
      type: "Express"
    },
    {
      id: "CG001287464",
      from: "Chicago, IL",
      to: "Miami, FL",
      status: "Out for Delivery",
      location: "Miami, FL",
      progress: 95,
      eta: "30 minutes",
      type: "Same-day"
    },
    {
      id: "CG001287465",
      from: "Seattle, WA",
      to: "Portland, OR",
      status: "Delivered",
      location: "Portland, OR",
      progress: 100,
      eta: "Completed",
      type: "Standard"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Transit":
        return <Truck className="w-4 h-4 text-[hsl(var(--logistics-blue))]" />;
      case "Out for Delivery":
        return <Package2 className="w-4 h-4 text-[hsl(var(--delivery-orange))]" />;
      case "Delivered":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-[hsl(var(--professional-gray))]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit":
        return "bg-[hsl(var(--logistics-blue))] text-white";
      case "Out for Delivery":
        return "bg-[hsl(var(--delivery-orange))] text-white";
      case "Delivered":
        return "bg-green-500 text-white";
      default:
        return "bg-[hsl(var(--professional-gray))] text-white";
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-[hsl(var(--logistics-blue-light))] to-[hsl(var(--delivery-orange-light))]">
      <div className="container-logistics">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-4">
            Live Shipment Tracking
          </h2>
          <p className="text-lg text-[hsl(var(--professional-gray))] mb-2">
            Real-time updates from our global logistics network
          </p>
          <div className="flex items-center justify-center text-[hsl(var(--logistics-blue))] font-mono text-sm">
            <Clock className="w-4 h-4 mr-2" />
            {currentTime.toLocaleTimeString()} UTC
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {liveShipments.map((shipment, index) => (
            <Card key={shipment.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg text-[hsl(var(--logistics-blue))] font-mono">
                    {shipment.id}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {shipment.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-3 h-3 text-[hsl(var(--professional-gray))] mr-2" />
                    <span className="text-[hsl(var(--professional-gray))]">From:</span>
                    <span className="ml-2 font-semibold">{shipment.from}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-3 h-3 text-[hsl(var(--professional-gray))] mr-2" />
                    <span className="text-[hsl(var(--professional-gray))]">To:</span>
                    <span className="ml-2 font-semibold">{shipment.to}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(shipment.status)}>
                    {getStatusIcon(shipment.status)}
                    <span className="ml-1">{shipment.status}</span>
                  </Badge>
                  <span className="text-sm font-medium text-[hsl(var(--delivery-orange))]">
                    ETA: {shipment.eta}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(var(--professional-gray))]">Current Location:</span>
                    <span className="font-semibold">{shipment.location}</span>
                  </div>
                  <div className="w-full bg-[hsl(var(--professional-gray-light))] rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${shipment.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-[hsl(var(--professional-gray))]">
                    {shipment.progress}% Complete
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveTrackingWidget;