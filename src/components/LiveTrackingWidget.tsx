import { useState, useEffect } from "react";
import { MapPin, Clock, Package2, Truck, CheckCircle, Shield, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatUKTime, getUKTimezone } from "@/utils/timeUtils";



const LiveTrackingWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const pulse = setInterval(() => setPulseIndex((p) => (p + 1) % 3), 2500);
    return () => clearInterval(pulse);
  }, []);

  const liveShipments = [
    {
      id: "CG001287463",
      from: "London, UK",
      to: "Manchester, UK",
      status: "In Transit",
      location: "Birmingham, UK",
      progress: 60,
      eta: "2 hours",
      type: "Express",
      weight: "5.2 kg",
      updated: "2 min ago",
    },
    {
      id: "CG001287464",
      from: "Bristol, UK",
      to: "Edinburgh, UK",
      status: "Out for Delivery",
      location: "Edinburgh, UK",
      progress: 95,
      eta: "30 minutes",
      type: "Same-day",
      weight: "1.8 kg",
      updated: "45 sec ago",
    },
    {
      id: "CG001287465",
      from: "Leeds, UK",
      to: "Cardiff, UK",
      status: "Delivered",
      location: "Cardiff, UK",
      progress: 100,
      eta: "Completed",
      type: "Standard",
      weight: "12.0 kg",
      updated: "15 min ago",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Transit":
        return <Truck className="w-4 h-4" />;
      case "Out for Delivery":
        return <Package2 className="w-4 h-4" />;
      case "Delivered":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit":
        return "bg-[hsl(var(--logistics-blue))] text-white";
      case "Out for Delivery":
        return "bg-[hsl(var(--delivery-orange))] text-white";
      case "Delivered":
        return "bg-green-600 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-600";
      case "Out for Delivery":
        return "bg-[hsl(var(--delivery-orange))]";
      default:
        return "bg-gradient-to-r from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))]";
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-[hsl(var(--logistics-blue-light))] to-background">
      <div className="container-logistics">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[hsl(var(--logistics-blue))]/10 text-[hsl(var(--logistics-blue))] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live Network Activity
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Shipment Tracking
          </h2>
          <p className="text-lg text-muted-foreground mb-3">
            Real-time updates from our logistics network
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center text-[hsl(var(--logistics-blue))] font-mono text-sm">
              <Clock className="w-4 h-4 mr-2" />
              {formatUKTime()} {getUKTimezone()}
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <Shield className="w-4 h-4 mr-1.5" />
              Secured & Encrypted
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {liveShipments.map((shipment, index) => (
            <Card
              key={shipment.id}
              className={`bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in ${
                pulseIndex === index && shipment.status !== "Delivered"
                  ? "ring-2 ring-[hsl(var(--logistics-blue))]/20"
                  : ""
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base text-[hsl(var(--logistics-blue))] font-mono tracking-wide">
                      {shipment.id}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      Updated {shipment.updated}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs font-medium">
                    {shipment.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--logistics-blue))] mr-2.5" />
                    <span className="text-muted-foreground w-12">From</span>
                    <span className="font-medium text-foreground">{shipment.from}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--delivery-orange))] mr-2.5" />
                    <span className="text-muted-foreground w-12">To</span>
                    <span className="font-medium text-foreground">{shipment.to}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={`${getStatusColor(shipment.status)} gap-1`}>
                    {getStatusIcon(shipment.status)}
                    {shipment.status}
                  </Badge>
                  <span className="text-sm font-semibold text-[hsl(var(--delivery-orange))]">
                    {shipment.eta}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Location
                    </span>
                    <span className="font-medium text-foreground">
                      {shipment.location}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className={`${getProgressColor(shipment.status)} h-2 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${shipment.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{shipment.weight}</span>
                    <span>{shipment.progress}% Complete</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Tracking data is masked for security. Full details available in the admin portal.
        </p>
      </div>
    </section>
  );
};

export default LiveTrackingWidget;
