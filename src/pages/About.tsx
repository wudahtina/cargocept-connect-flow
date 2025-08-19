import { useEffect, useState } from "react";
import { Package, Users, Globe, Clock, Target, Shield, Award, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import globalNetwork from "@/assets/global-network.png";
import warehouseOperations from "@/assets/warehouse-operations.png";
import cargoShipPort from "@/assets/cargo-ship-port.png";
import deliveryFleet from "@/assets/delivery-fleet.png";
import courierTeam from "@/assets/courier-team.png";

const About = () => {
  const [counters, setCounters] = useState({
    packages: 0,
    countries: 0,
    customers: 0,
    uptime: 0
  });

  const finalValues = {
    packages: 10000,
    countries: 50,
    customers: 5000,
    uptime: 99.9
  };

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 50;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCounters({
          packages: Math.floor(finalValues.packages * progress),
          countries: Math.floor(finalValues.countries * progress),
          customers: Math.floor(finalValues.customers * progress),
          uptime: parseFloat((finalValues.uptime * progress).toFixed(1))
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters(finalValues);
        }
      }, interval);
    };

    animateCounters();
  }, []);

  const timelineEvents = [
    { year: "2020", title: "Company Founded", description: "Cargocept was established with a vision to revolutionize logistics" },
    { year: "2021", title: "International Expansion", description: "Extended services to 25 countries across Europe and Asia" },
    { year: "2022", title: "Technology Innovation", description: "Launched real-time tracking and AI-powered routing systems" },
    { year: "2023", title: "Global Network", description: "Reached 50+ countries with 24/7 customer support" },
    { year: "2024", title: "Future Ready", description: "Expanding into sustainable logistics and drone delivery" }
  ];

  const teamMembers = [
    { name: "Sarah Johnson", role: "CEO & Founder", avatar: "👩‍💼", description: "20+ years in logistics industry" },
    { name: "Michael Chen", role: "CTO", avatar: "👨‍💻", description: "Expert in logistics technology" },
    { name: "Emma Rodriguez", role: "Operations Director", avatar: "👩‍💼", description: "Global operations specialist" },
    { name: "David Wilson", role: "Customer Relations", avatar: "👨‍💼", description: "Customer experience advocate" }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={globalNetwork} alt="Global Network" className="w-full h-full object-cover" />
        </div>
        <div className="container-logistics relative z-10">
          <div className="text-center space-y-6 fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold">
              About Cargocept
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
              Pioneering the future of logistics with innovative solutions, 
              trusted partnerships, and unwavering commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="container-logistics">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 fade-in-up">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-[hsl(var(--professional-gray))] leading-relaxed mb-6">
                  To connect businesses and individuals worldwide through reliable, 
                  innovative, and sustainable logistics solutions. We strive to make 
                  shipping simple, transparent, and accessible for everyone.
                </p>
                <p className="text-lg text-[hsl(var(--professional-gray))] leading-relaxed">
                  Our commitment goes beyond just moving packages – we're building 
                  bridges between communities, enabling commerce, and fostering 
                  global connections that matter.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <Card className="border-[hsl(var(--logistics-blue))] border-2">
                  <CardContent className="p-6 text-center">
                    <Target className="w-12 h-12 text-[hsl(var(--delivery-orange))] mx-auto mb-4" />
                    <h3 className="font-semibold text-[hsl(var(--logistics-blue))]">Reliability</h3>
                    <p className="text-sm text-[hsl(var(--professional-gray))] mt-2">
                      Consistent, dependable service you can trust
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-[hsl(var(--logistics-blue))] border-2">
                  <CardContent className="p-6 text-center">
                    <Shield className="w-12 h-12 text-[hsl(var(--delivery-orange))] mx-auto mb-4" />
                    <h3 className="font-semibold text-[hsl(var(--logistics-blue))]">Security</h3>
                    <p className="text-sm text-[hsl(var(--professional-gray))] mt-2">
                      Your packages are safe with our advanced security measures
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              <img 
                src={warehouseOperations} 
                alt="Warehouse Operations" 
                className="rounded-lg shadow-xl w-full h-auto hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Animated Statistics */}
      <section className="py-20 bg-gradient-to-br from-[hsl(var(--logistics-blue-light))] to-[hsl(var(--delivery-orange-light))]">
        <div className="container-logistics">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-[hsl(var(--professional-gray))]">
              Trusted by thousands of businesses worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="bg-white border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <Package className="w-16 h-16 text-[hsl(var(--delivery-orange))] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-2">
                  {counters.packages.toLocaleString()}+
                </div>
                <div className="text-[hsl(var(--professional-gray))]">Packages Delivered</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <Globe className="w-16 h-16 text-[hsl(var(--delivery-orange))] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-2">
                  {counters.countries}+
                </div>
                <div className="text-[hsl(var(--professional-gray))]">Countries Served</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <Users className="w-16 h-16 text-[hsl(var(--delivery-orange))] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-2">
                  {counters.customers.toLocaleString()}+
                </div>
                <div className="text-[hsl(var(--professional-gray))]">Happy Customers</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <Clock className="w-16 h-16 text-[hsl(var(--delivery-orange))] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-2">
                  {counters.uptime}%
                </div>
                <div className="text-[hsl(var(--professional-gray))]">Uptime Guarantee</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-white">
        <div className="container-logistics">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-[hsl(var(--professional-gray))]">
              From startup to global logistics leader
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[hsl(var(--logistics-blue))] hidden lg:block"></div>
            
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div 
                  key={index} 
                  className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} fade-in-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="lg:w-1/2 lg:px-8">
                    <Card className="bg-gradient-to-br from-white to-[hsl(var(--logistics-blue-light))] border-[hsl(var(--logistics-blue))] border-2 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-[hsl(var(--delivery-orange))] mb-2">
                          {event.year}
                        </div>
                        <h3 className="text-xl font-semibold text-[hsl(var(--logistics-blue))] mb-2">
                          {event.title}
                        </h3>
                        <p className="text-[hsl(var(--professional-gray))]">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden lg:block w-4 h-4 bg-[hsl(var(--delivery-orange))] rounded-full border-4 border-white shadow-lg animate-logistics-pulse"></div>
                  
                  <div className="lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operations Gallery */}
      <section className="py-20 bg-[hsl(var(--professional-gray-lighter))]">
        <div className="container-logistics">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-4">
              Our Operations
            </h2>
            <p className="text-xl text-[hsl(var(--professional-gray))]">
              Behind the scenes of world-class logistics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="fade-in-up">
              <img 
                src={cargoShipPort} 
                alt="Cargo Ship at Port" 
                className="rounded-lg shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
              <h3 className="text-lg font-semibold text-[hsl(var(--logistics-blue))] mt-4">
                International Shipping
              </h3>
              <p className="text-[hsl(var(--professional-gray))] text-sm mt-2">
                State-of-the-art port operations and container management
              </p>
            </div>

            <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
              <img 
                src={deliveryFleet} 
                alt="Delivery Fleet" 
                className="rounded-lg shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
              <h3 className="text-lg font-semibold text-[hsl(var(--logistics-blue))] mt-4">
                Local Delivery
              </h3>
              <p className="text-[hsl(var(--professional-gray))] text-sm mt-2">
                Modern fleet for fast and reliable local deliveries
              </p>
            </div>

            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              <img 
                src={courierTeam} 
                alt="Courier Team" 
                className="rounded-lg shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
              <h3 className="text-lg font-semibold text-[hsl(var(--logistics-blue))] mt-4">
                Professional Team
              </h3>
              <p className="text-[hsl(var(--professional-gray))] text-sm mt-2">
                Dedicated professionals ensuring every delivery is perfect
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container-logistics">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-[hsl(var(--professional-gray))]">
              The experts behind Cargocept's success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-lg transition-shadow fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <h3 className="text-lg font-semibold text-[hsl(var(--logistics-blue))] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[hsl(var(--delivery-orange))] font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-[hsl(var(--professional-gray))]">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] text-white">
        <div className="container-logistics text-center">
          <div className="space-y-6 fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Experience Excellence?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Cargocept 
              for their logistics needs.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="delivery" size="lg">
                Get Started Today
              </Button>
              <Button variant="tracking" size="lg">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;