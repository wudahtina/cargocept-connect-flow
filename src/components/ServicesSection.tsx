import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import expressDelivery from "@/assets/express-delivery.png";
import internationalShipping from "@/assets/international-shipping.png";
import sameDayDelivery from "@/assets/same-day-delivery.png";
import freightTransport from "@/assets/freight-transport.png";

const ServicesSection = () => {
  const services = [
    {
      title: "Express Delivery",
      description: "Fast and reliable express delivery for urgent packages. Get your shipments delivered within 24-48 hours with priority handling.",
      image: expressDelivery,
      features: ["24-48 hour delivery", "Priority handling", "Real-time tracking", "Signature required"]
    },
    {
      title: "International Shipping",
      description: "Seamless global shipping solutions with customs clearance. Connect your business to markets worldwide with our international network.",
      image: internationalShipping,
      features: ["Global coverage", "Customs clearance", "Documentation support", "Duty & tax handling"]
    },
    {
      title: "Same-Day Delivery",
      description: "Ultra-fast same-day delivery for local and metropolitan areas. Perfect for urgent documents and time-sensitive deliveries.",
      image: sameDayDelivery,
      features: ["Same-day pickup", "Local coverage", "Real-time updates", "Emergency delivery"]
    },
    {
      title: "Freight & Bulk Transport",
      description: "Heavy freight and bulk cargo solutions for businesses. Specialized handling for large shipments and industrial cargo.",
      image: freightTransport,
      features: ["Heavy freight", "Bulk shipping", "Specialized handling", "Industrial solutions"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-[hsl(var(--professional-gray-lighter))]">
      <div className="container-logistics">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-4">
            Our Logistics Services
          </h2>
          <p className="text-xl text-[hsl(var(--professional-gray))] max-w-3xl mx-auto">
            Comprehensive shipping and logistics solutions tailored to your business needs. 
            From express delivery to international freight, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[hsl(var(--logistics-blue-light))] to-[hsl(var(--delivery-orange-light))] rounded-2xl flex items-center justify-center">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <CardTitle className="text-xl text-[hsl(var(--logistics-blue))]">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[hsl(var(--professional-gray))] text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-[hsl(var(--professional-gray))]">
                      <ArrowRight className="w-3 h-3 text-[hsl(var(--delivery-orange))] mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="w-full mt-4 border-[hsl(var(--logistics-blue))] text-[hsl(var(--logistics-blue))] hover:bg-[hsl(var(--logistics-blue))] hover:text-white">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="logistics" size="lg">
            View All Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;