import { Play, Users, Scan, Truck, Warehouse } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import loadingDockImage from "@/assets/cargocept-loading-dock.jpg";
import workersImage from "@/assets/cargocept-workers-scanning.jpg";

const OperationsShowcase = () => {
  const operationalFeatures = [
    {
      icon: <Scan className="w-6 h-6 text-[hsl(var(--dhl-yellow))]" />,
      title: "Real-Time Scanning",
      description: "Every package tracked with precision technology"
    },
    {
      icon: <Users className="w-6 h-6 text-[hsl(var(--dhl-yellow))]" />,
      title: "Expert Team",
      description: "Professional logistics specialists at every step"
    },
    {
      icon: <Warehouse className="w-6 h-6 text-[hsl(var(--dhl-yellow))]" />,
      title: "Modern Facilities",
      description: "State-of-the-art warehouses and distribution centers"
    },
    {
      icon: <Truck className="w-6 h-6 text-[hsl(var(--dhl-yellow))]" />,
      title: "Advanced Fleet",
      description: "Latest technology vehicles for reliable delivery"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[hsl(var(--professional-gray-lighter))] to-white overflow-hidden">
      <div className="container-logistics">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-4 animate-fade-in-up">
            Behind the Scenes Excellence
          </h2>
          <p className="text-xl text-[hsl(var(--professional-gray))] max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            See how our dedicated team and cutting-edge technology ensure your packages reach their destination safely and on time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Loading Dock Image */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--logistics-blue))] to-[hsl(var(--dhl-red))] rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
            <img 
              src={loadingDockImage} 
              alt="Cargo Cept loading dock operations with branded trucks and workers"
              className="relative z-10 rounded-2xl shadow-2xl w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-[hsl(var(--logistics-blue))]">Live Operations</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-6">
            {operationalFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white border-l-4 border-l-[hsl(var(--dhl-red))] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-x-2 animate-fade-in-up"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-[hsl(var(--logistics-blue))] rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[hsl(var(--logistics-blue))] mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-[hsl(var(--professional-gray))]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Workers Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content First on Mobile */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
              <h3 className="text-3xl font-bold text-[hsl(var(--logistics-blue))]">
                Technology Meets Expertise
              </h3>
              <p className="text-lg text-[hsl(var(--professional-gray))] leading-relaxed">
                Our team of logistics professionals uses the latest scanning technology and 
                real-time tracking systems to ensure every package is handled with precision 
                and care from pickup to delivery.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: "1s" }}>
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <div className="text-2xl font-bold text-[hsl(var(--dhl-red))]">99.7%</div>
                <div className="text-sm text-[hsl(var(--professional-gray))]">Scan Accuracy</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <div className="text-2xl font-bold text-[hsl(var(--dhl-red))]">24/7</div>
                <div className="text-sm text-[hsl(var(--professional-gray))]">Operations</div>
              </div>
            </div>

            <Button 
              className="bg-[hsl(var(--dhl-red))] hover:bg-[hsl(var(--dhl-red))]/90 text-white px-8 py-3 animate-fade-in-up"
              style={{ animationDelay: "1.2s" }}
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Operations Video
            </Button>
          </div>

          {/* Workers Image */}
          <div className="relative group order-1 lg:order-2 animate-fade-in-up" style={{ animationDelay: "1s" }}>
            <div className="absolute inset-0 bg-gradient-to-tl from-[hsl(var(--dhl-yellow))] to-[hsl(var(--logistics-blue))] rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>
            <img 
              src={workersImage} 
              alt="Cargo Cept workers in branded uniforms using scanning technology"
              className="relative z-10 rounded-2xl shadow-2xl w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 right-4 z-20 bg-[hsl(var(--dhl-red))]/90 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
              <div className="flex items-center space-x-2">
                <Scan className="w-4 h-4" />
                <span className="text-sm font-semibold">Precision Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationsShowcase;