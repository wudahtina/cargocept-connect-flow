import { Trophy, Award, Globe, Users, Package, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import brandedTruck from "@/assets/branded-truck.jpg";
import workersUniform from "@/assets/workers-uniform.jpg";
import controlRoom from "@/assets/control-room.jpg";
import fleetOperations from "@/assets/fleet-operations.jpg";

const CompanyMilestones = () => {
  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description: "Cargocept was established with a vision to revolutionize global logistics",
      icon: <Building className="w-6 h-6" />,
      image: brandedTruck
    },
    {
      year: "2020",
      title: "1 Million Deliveries",
      description: "Reached our first major milestone of 1 million successful deliveries",
      icon: <Package className="w-6 h-6" />,
      image: workersUniform
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded operations to 195+ countries with 24/7 tracking technology",
      icon: <Globe className="w-6 h-6" />,
      image: controlRoom
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Recognized as a leading logistics provider with 50,000+ business partners",
      icon: <Trophy className="w-6 h-6" />,
      image: fleetOperations
    }
  ];

  const achievements = [
    {
      title: "ISO 9001:2015 Certified",
      description: "Quality Management Systems",
      icon: <Award className="w-8 h-8 text-[hsl(var(--dhl-red))]" />,
      color: "border-[hsl(var(--dhl-red))]"
    },
    {
      title: "Carbon Neutral Shipping",
      description: "100% Green Logistics by 2025",
      icon: <Globe className="w-8 h-8 text-green-500" />,
      color: "border-green-500"
    },
    {
      title: "50,000+ Partners",
      description: "Global Business Network",
      icon: <Users className="w-8 h-8 text-[hsl(var(--logistics-blue))]" />,
      color: "border-[hsl(var(--logistics-blue))]"
    },
    {
      title: "99.9% Uptime",
      description: "Reliable System Performance",
      icon: <Trophy className="w-8 h-8 text-[hsl(var(--delivery-orange))]" />,
      color: "border-[hsl(var(--delivery-orange))]"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[hsl(var(--professional-gray-lighter))] to-white">
      <div className="container-logistics">
        {/* Company Journey */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-4">
            Our Journey to Excellence
          </h2>
          <p className="text-xl text-[hsl(var(--professional-gray))] max-w-3xl mx-auto">
            From a startup vision to a global logistics leader - see how we've grown to serve millions worldwide
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-full"></div>
            
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Content */}
                  <div className="w-5/12">
                    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="p-2 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-lg text-white mr-3">
                            {milestone.icon}
                          </div>
                          <Badge variant="outline" className="font-bold text-[hsl(var(--logistics-blue))]">
                            {milestone.year}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-[hsl(var(--logistics-blue))] mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-[hsl(var(--professional-gray))] text-sm leading-relaxed">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Node */}
                  <div className="w-2/12 flex justify-center">
                    <div className="w-6 h-6 bg-white border-4 border-[hsl(var(--logistics-blue))] rounded-full z-10 shadow-lg"></div>
                  </div>

                  {/* Image */}
                  <div className="w-5/12">
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                      <img 
                        src={milestone.image} 
                        alt={milestone.title}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="text-center mb-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-[hsl(var(--logistics-blue))] mb-4">
            Industry Recognition
          </h3>
          <p className="text-lg text-[hsl(var(--professional-gray))]">
            Awards and certifications that showcase our commitment to excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <Card 
              key={index}
              className={`bg-white border-2 ${achievement.color} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-gradient-to-br from-white to-[hsl(var(--professional-gray-lighter))] rounded-lg shadow-sm">
                    {achievement.icon}
                  </div>
                </div>
                <h4 className="font-bold text-[hsl(var(--logistics-blue))] mb-2">
                  {achievement.title}
                </h4>
                <p className="text-[hsl(var(--professional-gray))] text-sm">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Join Our Success Story</h3>
            <p className="text-lg opacity-90 mb-6">Be part of the next milestone in global logistics innovation</p>
            <div className="flex justify-center space-x-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Trusted by 50,000+ businesses
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                99.9% customer satisfaction
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyMilestones;