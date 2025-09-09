import { useState, useEffect } from "react";
import { TrendingUp, Package, Globe, Clock, Users, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DeliveryStats = () => {
  const [stats, setStats] = useState({
    packagesDelivered: 1247856,
    activeShipments: 12847,
    countriesServed: 195,
    avgDeliveryTime: 2.3,
    customerSatisfaction: 99.2,
    activeTrucks: 2847
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        packagesDelivered: prev.packagesDelivered + Math.floor(Math.random() * 5) + 1,
        activeShipments: prev.activeShipments + Math.floor(Math.random() * 10) - 5,
        activeTrucks: prev.activeTrucks + Math.floor(Math.random() * 6) - 3
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      icon: <Package className="w-8 h-8 text-[hsl(var(--dhl-red))]" />,
      label: "Packages Delivered Today",
      value: stats.packagesDelivered.toLocaleString(),
      change: "+12.5%",
      trending: true
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[hsl(var(--logistics-blue))]" />,
      label: "Active Shipments",
      value: stats.activeShipments.toLocaleString(),
      change: "+5.8%",
      trending: true
    },
    {
      icon: <Globe className="w-8 h-8 text-[hsl(var(--delivery-orange))]" />,
      label: "Countries Served",
      value: stats.countriesServed.toString(),
      change: "Global Coverage",
      trending: false
    },
    {
      icon: <Clock className="w-8 h-8 text-green-500" />,
      label: "Avg Delivery Time",
      value: `${stats.avgDeliveryTime} days`,
      change: "-15.3%",
      trending: true
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      label: "Customer Satisfaction",
      value: `${stats.customerSatisfaction}%`,
      change: "+2.1%",
      trending: true
    },
    {
      icon: <Truck className="w-8 h-8 text-[hsl(var(--dhl-red))]" />,
      label: "Active Fleet",
      value: stats.activeTrucks.toLocaleString(),
      change: "Real-time",
      trending: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-logistics">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-4">
            Live Logistics Dashboard
          </h2>
          <p className="text-xl text-[hsl(var(--professional-gray))] max-w-3xl mx-auto">
            Real-time data from our global operations center, updated every second
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-[hsl(var(--logistics-blue-light))] to-[hsl(var(--delivery-orange-light))] rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-[hsl(var(--logistics-blue))]">Live Updates Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statItems.map((item, index) => (
            <Card 
              key={index} 
              className="bg-gradient-to-br from-white to-[hsl(var(--professional-gray-lighter))] border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    {item.icon}
                  </div>
                  {item.trending && (
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      item.change.startsWith('+') 
                        ? 'bg-green-100 text-green-700' 
                        : item.change.startsWith('-') 
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-[hsl(var(--professional-gray-light))] text-[hsl(var(--professional-gray))]'
                    }`}>
                      {item.change}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-[hsl(var(--logistics-blue))] animate-logistics-pulse">
                    {item.value}
                  </h3>
                  <p className="text-[hsl(var(--professional-gray))] text-sm font-medium">
                    {item.label}
                  </p>
                </div>

                {!item.trending && (
                  <div className="mt-3 text-xs text-[hsl(var(--delivery-orange))] font-medium">
                    {item.change}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Global Network Visualization */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Global Network Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm opacity-90">Operations</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">350+</div>
                <div className="text-sm opacity-90">Warehouses</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">5,000+</div>
                <div className="text-sm opacity-90">Delivery Partners</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">98.7%</div>
                <div className="text-sm opacity-90">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryStats;