import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Solutions",
      role: "Operations Manager",
      rating: 5,
      text: "Cargocept has revolutionized our shipping operations. Their real-time tracking and express delivery service helped us reduce delivery times by 40%. Absolutely fantastic!",
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen",
      company: "Global Imports Ltd.",
      role: "Logistics Director",
      rating: 5,
      text: "The international shipping service is outstanding. Customs clearance was seamless, and our packages arrived exactly when promised. Best logistics partner we've ever had.",
      avatar: "👨‍💼"
    },
    {
      name: "Emily Rodriguez",
      company: "Fashion Forward",
      role: "Supply Chain Manager",
      rating: 5,
      text: "Same-day delivery has been a game-changer for our business. Customer satisfaction has increased dramatically since we started using Cargocept's services.",
      avatar: "👩‍💻"
    },
    {
      name: "David Wilson",
      company: "Industrial Corp",
      role: "Procurement Head",
      rating: 5,
      text: "Their freight and bulk transport service handles our heavy machinery shipments with care. Professional, reliable, and cost-effective. Highly recommended!",
      avatar: "👨‍🔧"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[hsl(var(--logistics-blue-light))] to-[hsl(var(--delivery-orange-light))]">
      <div className="container-logistics">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-[hsl(var(--professional-gray))] max-w-3xl mx-auto">
            Trusted by thousands of businesses worldwide. See why companies choose 
            Cargocept for their logistics and shipping needs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main Testimonial Card */}
          <Card className="bg-white border-0 shadow-xl">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center space-y-6">
                {/* Quote Icon */}
                <Quote className="w-12 h-12 text-[hsl(var(--delivery-orange))] mx-auto opacity-50" />
                
                {/* Rating */}
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-[hsl(var(--delivery-orange))] text-[hsl(var(--delivery-orange))]" 
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg lg:text-xl text-[hsl(var(--professional-gray))] leading-relaxed max-w-2xl mx-auto">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center justify-center space-x-4 pt-6 border-t border-[hsl(var(--professional-gray-light))]">
                  <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-full flex items-center justify-center text-2xl">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-[hsl(var(--logistics-blue))]">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-[hsl(var(--professional-gray))] text-sm">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-[hsl(var(--delivery-orange))] text-sm font-medium">
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="border-[hsl(var(--logistics-blue))] text-[hsl(var(--logistics-blue))] hover:bg-[hsl(var(--logistics-blue))] hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-[hsl(var(--logistics-blue))]' 
                      : 'bg-[hsl(var(--professional-gray-light))]'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="border-[hsl(var(--logistics-blue))] text-[hsl(var(--logistics-blue))] hover:bg-[hsl(var(--logistics-blue))] hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[hsl(var(--logistics-blue))]">50K+</div>
              <div className="text-[hsl(var(--professional-gray))] text-sm">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[hsl(var(--logistics-blue))]">1M+</div>
              <div className="text-[hsl(var(--professional-gray))] text-sm">Packages Delivered</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[hsl(var(--logistics-blue))]">99.9%</div>
              <div className="text-[hsl(var(--professional-gray))] text-sm">Delivery Success Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[hsl(var(--logistics-blue))]">24/7</div>
              <div className="text-[hsl(var(--professional-gray))] text-sm">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;