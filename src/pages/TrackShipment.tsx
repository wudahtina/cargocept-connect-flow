import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Package, CheckCircle, Clock, Truck, MapPin, ArrowRight, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { getShipmentByTracking, type Shipment, type ShipmentStatus } from "@/lib/store";

const allStatuses: ShipmentStatus[] = ["Pending", "Processing", "Picked Up", "In Transit", "Out for Delivery", "Delivered"];

const statusIcons: Record<string, any> = {
  Pending: Clock,
  Processing: Package,
  "Picked Up": Package,
  "In Transit": Truck,
  "Out for Delivery": Truck,
  Delivered: CheckCircle,
};

const TrackShipment = () => {
  const [searchParams] = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get("id") || "");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = () => {
    if (!trackingNumber.trim()) return;
    setIsLoading(true);
    setNotFound(false);
    setTimeout(() => {
      const found = getShipmentByTracking(trackingNumber.trim());
      if (found) { setShipment(found); setNotFound(false); }
      else { setShipment(null); setNotFound(true); }
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    if (searchParams.get("id")) handleTrack();
  }, []);

  const getStepIndex = (status: ShipmentStatus) => allStatuses.indexOf(status);
  const currentStep = shipment ? getStepIndex(shipment.status) : -1;

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="py-16 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container-logistics text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Track Your Shipment</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">Enter your tracking number to see real-time updates.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-logistics max-w-2xl">
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter tracking number (e.g., CG001287463)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="h-12 text-base border-primary"
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                />
                <Button onClick={handleTrack} variant="logistics" className="h-12 px-6" disabled={isLoading}>
                  {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : <><Search className="mr-2 h-4 w-4" />Track</>}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {notFound && (
        <section className="pb-16 bg-white">
          <div className="container-logistics max-w-2xl">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="border-destructive/30 border rounded-2xl">
                <CardContent className="p-8 text-center space-y-3">
                  <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
                  <h3 className="text-xl font-bold text-foreground">Shipment Not Found</h3>
                  <p className="text-muted-foreground">No shipment found with tracking number <span className="font-mono font-bold">{trackingNumber}</span>. Please check and try again.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {shipment && (
        <section className="pb-20 bg-white">
          <div className="container-logistics max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Shipment Info */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <CardTitle className="text-xl text-primary font-mono">{shipment.trackingNumber}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{shipment.customerName}</p>
                    </div>
                    <Badge className={`text-sm px-4 py-1.5 ${shipment.status === "Delivered" ? "bg-green-500 text-white" : "bg-primary text-white"}`}>
                      {shipment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm mb-6 bg-secondary/50 rounded-xl p-4">
                    <div className="text-center">
                      <MapPin className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="font-semibold">{shipment.origin}</p>
                      <p className="text-muted-foreground text-xs">Origin</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    <div className="text-center">
                      <MapPin className="w-5 h-5 text-accent mx-auto mb-1" />
                      <p className="font-semibold">{shipment.destination}</p>
                      <p className="text-muted-foreground text-xs">Destination</p>
                    </div>
                  </div>

                  {/* Step-based Timeline (DHL/FedEx style) */}
                  <div className="relative">
                    {/* Progress bar */}
                    <div className="hidden sm:flex items-center justify-between mb-8 relative">
                      <div className="absolute top-4 left-0 right-0 h-1 bg-muted rounded-full">
                        <div
                          className="h-1 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                          style={{ width: `${(currentStep / (allStatuses.length - 1)) * 100}%` }}
                        />
                      </div>
                      {allStatuses.map((status, i) => {
                        const Icon = statusIcons[status] || Clock;
                        const isCompleted = i <= currentStep;
                        const isCurrent = i === currentStep;
                        return (
                          <div key={status} className="relative flex flex-col items-center z-10" style={{ width: `${100 / allStatuses.length}%` }}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              isCompleted ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                            } ${isCurrent ? "ring-4 ring-primary/20 scale-110" : ""}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className={`text-xs mt-2 text-center ${isCompleted ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                              {status}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Vertical timeline for mobile */}
                    <div className="sm:hidden space-y-4">
                      {allStatuses.map((status, i) => {
                        const Icon = statusIcons[status] || Clock;
                        const isCompleted = i <= currentStep;
                        const isCurrent = i === currentStep;
                        const timelineEntry = shipment.timeline.find(t => t.status === status);
                        return (
                          <div key={status} className="flex items-start gap-4">
                            <div className="flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isCompleted ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                              } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              {i < allStatuses.length - 1 && <div className={`w-0.5 h-8 ${isCompleted ? "bg-primary" : "bg-muted"}`} />}
                            </div>
                            <div className="pt-1">
                              <p className={`font-medium ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>{status}</p>
                              {timelineEntry && <p className="text-xs text-muted-foreground">{timelineEntry.date} • {timelineEntry.location}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Detailed Timeline */}
                  {shipment.timeline.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-border">
                      <h3 className="font-semibold text-foreground mb-4">Tracking History</h3>
                      <div className="space-y-3">
                        {[...shipment.timeline].reverse().map((entry, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm">
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-foreground">{entry.status}</p>
                              <p className="text-muted-foreground">{entry.location} • {entry.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-12 bg-secondary/30">
        <div className="container-logistics text-center space-y-4">
          <h2 className="text-2xl font-bold text-primary">Need Help?</h2>
          <p className="text-muted-foreground">Our support team is available 24/7.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/contact"><Button variant="logistics">Contact Support</Button></Link>
            <Link to="/tracking-faq"><Button variant="outline" className="border-primary text-primary">FAQ</Button></Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrackShipment;
