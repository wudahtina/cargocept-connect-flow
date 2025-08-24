import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import { ArrowRight, Clock, Globe, Shield, Truck, Package, Ship, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import warehouseInterior from "@/assets/warehouse-interior.jpg";
import truckFleet from "@/assets/truck-fleet.jpg";
import cargoPlane from "@/assets/cargo-plane.jpg";
import happyDelivery from "@/assets/happy-delivery.jpg";

const Services = () => {
  const serviceDetails = [
    {
      title: "Express Delivery",
      icon: <Truck className="w-8 h-8" />,
      description: "Fast and reliable express delivery for urgent packages. Get your shipments delivered within 24-48 hours with priority handling.",
      features: [
        "24-48 hour delivery guarantee",
        "Priority handling and processing",
        "Real-time tracking updates",
        "Signature confirmation required",
        "Insurance coverage included",
        "Weekend and holiday delivery"
      ],
      pricing: "Starting from $15",
      bgColor: "from-[hsl(var(--logistics-blue))] to-[hsl(var(--logistics-blue-dark))]"
    },
    {
      title: "International Shipping",
      icon: <Ship className="w-8 h-8" />,
      description: "Seamless global shipping solutions with customs clearance. Connect your business to markets worldwide with our international network.",
      features: [
        "Global coverage to 50+ countries",
        "Full customs clearance service",
        "Documentation support included",
        "Duty and tax handling",
        "Multi-language customer support",
        "Specialized packaging options"
      ],
      pricing: "Starting from $25",
      bgColor: "from-[hsl(var(--delivery-orange))] to-[hsl(var(--delivery-orange-dark))]"
    },
    {
      title: "Same-Day Delivery",
      icon: <Bike className="w-8 h-8" />,
      description: "Ultra-fast same-day delivery for local and metropolitan areas. Perfect for urgent documents and time-sensitive deliveries.",
      features: [
        "Same-day pickup and delivery",
        "Local and metropolitan coverage",
        "Real-time courier tracking",
        "Emergency delivery service",
        "Flexible pickup times",
        "Direct courier contact"
      ],
      pricing: "Starting from $35",
      bgColor: "from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))]"
    },
    {
      title: "Freight & Bulk Transport",
      icon: <Package className="w-8 h-8" />,
      description: "Heavy freight and bulk cargo solutions for businesses. Specialized handling for large shipments and industrial cargo.",
      features: [
        "Heavy freight up to 10,000kg",
        "Bulk shipping solutions",
        "Specialized equipment handling",
        "Industrial cargo expertise",
        "Warehouse consolidation",
        "Custom logistics solutions"
      ],
      pricing: "Custom quotes available",
      bgColor: "from-[hsl(var(--professional-gray))] to-[hsl(var(--logistics-blue-dark))]"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] text-white">
        <div className="container-logistics">
          <div className="text-center space-y-6 fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Our Services
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
              Comprehensive logistics solutions tailored to your business needs. 
              From express delivery to international freight, we deliver excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Service Guarantees */}
      <section className="py-16 bg-white border-b">
        <div className="container-logistics">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-3 fade-in-up">
              <Clock className="w-12 h-12 text-[hsl(var(--delivery-orange))] mx-auto" />
              <h3 className="font-semibold text-[hsl(var(--logistics-blue))]">On-Time Delivery</h3>
              <p className="text-sm text-[hsl(var(--professional-gray))]">99.9% on-time delivery rate</p>
            </div>
            <div className="text-center space-y-3 fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Shield className="w-12 h-12 text-[hsl(var(--delivery-orange))] mx-auto" />
              <h3 className="font-semibold text-[hsl(var(--logistics-blue))]">Secure Handling</h3>
              <p className="text-sm text-[hsl(var(--professional-gray))]">Full insurance coverage</p>
            </div>
            <div className="text-center space-y-3 fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Globe className="w-12 h-12 text-[hsl(var(--delivery-orange))] mx-auto" />
              <h3 className="font-semibold text-[hsl(var(--logistics-blue))]">Global Reach</h3>
              <p className="text-sm text-[hsl(var(--professional-gray))]">50+ countries covered</p>
            </div>
            <div className="text-center space-y-3 fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Package className="w-12 h-12 text-[hsl(var(--delivery-orange))] mx-auto" />
              <h3 className="font-semibold text-[hsl(var(--logistics-blue))]">Real-time Tracking</h3>
              <p className="text-sm text-[hsl(var(--professional-gray))]">24/7 package visibility</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-20 bg-[hsl(var(--professional-gray-lighter))]">
        <div className="container-logistics">
          <div className="space-y-20">
            {serviceDetails.map((service, index) => (
              <div 
                key={index} 
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={`fade-in-up ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.bgColor} flex items-center justify-center text-white mb-4`}>
                        {service.icon}
                      </div>
                      <CardTitle className="text-2xl text-[hsl(var(--logistics-blue))]">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-[hsl(var(--professional-gray))] leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div>
                        <h4 className="font-semibold text-[hsl(var(--logistics-blue))] mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-[hsl(var(--professional-gray))]">
                              <ArrowRight className="w-4 h-4 text-[hsl(var(--delivery-orange))] mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-[hsl(var(--professional-gray-light))]">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-[hsl(var(--logistics-blue))]">
                            {service.pricing}
                          </span>
                          {service.pricing !== "Custom quotes available" && (
                            <span className="text-sm text-[hsl(var(--professional-gray))]">
                              per shipment
                            </span>
                          )}
                        </div>
                        <div className="flex gap-3">
                          <Link to="/create-shipment">
                            <Button variant="logistics" className="flex-1">
                              Get Quote
                            </Button>
                          </Link>
                          <Link to="/contact">
                            <Button variant="outline" className="flex-1 border-[hsl(var(--logistics-blue))] text-[hsl(var(--logistics-blue))]">
                              Learn More
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className={`fade-in-up ${index % 2 === 1 ? 'lg:col-start-1' : ''}`} style={{ animationDelay: '0.2s' }}>
                  <div className="h-80 rounded-lg overflow-hidden">
                    <img 
                      src={
                        index === 0 ? truckFleet :
                        index === 1 ? cargoPlane :
                        index === 2 ? happyDelivery :
                        warehouseInterior
                      }
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Include the existing services section for consistency */}
      <ServicesSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] text-white">
        <div className="container-logistics text-center">
          <div className="space-y-6 fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Ship with Cargocept?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Choose the service that fits your needs and experience 
              world-class logistics solutions.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/create-shipment">
                <Button variant="delivery" size="lg">
                  Create Shipment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="tracking" size="lg">
                  Contact Sales
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

export default Services;