import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle, Search, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const TrackingFAQ = () => {
  const faqData = [
    {
      question: "How do I track my shipment?",
      answer: "Enter your tracking number in the tracking box on our homepage or visit the Track Shipment page. Your tracking number is provided in your confirmation email or receipt."
    },
    {
      question: "Where can I find my tracking number?",
      answer: "Your tracking number is located in your confirmation email, SMS notification, or on your shipping receipt. It's typically 10-15 characters long and contains both letters and numbers."
    },
    {
      question: "Why isn't my tracking number working?",
      answer: "Please check that you've entered all characters correctly. New shipments may take 1-2 hours to appear in our system. If the issue persists, contact our support team."
    },
    {
      question: "What do the different tracking statuses mean?",
      answer: "• Picked Up: Your package has been collected\n• In Transit: Your package is on its way\n• Out for Delivery: Your package is with our courier for final delivery\n• Delivered: Your package has been successfully delivered"
    },
    {
      question: "How often is tracking information updated?",
      answer: "Tracking information is updated in real-time throughout the delivery process. You'll receive notifications at key milestones including pickup, transit updates, and delivery confirmation."
    },
    {
      question: "Can I change the delivery address after my package is shipped?",
      answer: "Address changes may be possible before the package reaches the final delivery facility. Contact our support team immediately with your tracking number to explore available options."
    },
    {
      question: "What happens if I'm not home for delivery?",
      answer: "Our courier will attempt delivery and leave a notice with instructions. You can reschedule delivery online using your tracking number or contact us to arrange pickup from a nearby location."
    },
    {
      question: "Why has my package been delayed?",
      answer: "Delays can occur due to weather conditions, customs processing (for international shipments), or high shipment volumes. Check your tracking page for specific delay information and updated delivery estimates."
    },
    {
      question: "Can I track multiple packages at once?",
      answer: "Yes! You can enter multiple tracking numbers separated by commas in our tracking tool, or create an account to save and monitor all your shipments in one dashboard."
    },
    {
      question: "How do I track international shipments?",
      answer: "International shipments follow the same tracking process but may have additional customs clearance steps. These will be clearly indicated in your tracking timeline with estimated processing times."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] text-white">
        <div className="container-logistics">
          <div className="text-center space-y-6 fade-in-up">
            <HelpCircle className="w-16 h-16 mx-auto text-white/80" />
            <h1 className="text-4xl lg:text-6xl font-bold">
              Tracking FAQ
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
              Get quick answers to all your package tracking questions. 
              Find solutions to common tracking issues and learn how to monitor your shipments.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-white border-b">
        <div className="container-logistics">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 fade-in-up">
              <Search className="w-12 h-12 text-[hsl(var(--delivery-orange))] mx-auto" />
              <h3 className="font-semibold text-[hsl(var(--logistics-blue))]">Track Your Package</h3>
              <p className="text-sm text-[hsl(var(--professional-gray))]">Enter your tracking number to get real-time updates</p>
              <Link to="/track">
                <Button variant="outline" className="border-[hsl(var(--logistics-blue))] text-[hsl(var(--logistics-blue))]">
                  Go to Tracking
                </Button>
              </Link>
            </div>
            <div className="text-center space-y-4 fade-in-up" style={{ animationDelay: '0.1s' }}>
              <MapPin className="w-12 h-12 text-[hsl(var(--delivery-orange))] mx-auto" />
              <h3 className="font-semibold text-[hsl(var(--logistics-blue))]">Find Locations</h3>
              <p className="text-sm text-[hsl(var(--professional-gray))]">Locate pickup points and service centers</p>
              <Link to="/contact">
                <Button variant="outline" className="border-[hsl(var(--logistics-blue))] text-[hsl(var(--logistics-blue))]">
                  Find Locations
                </Button>
              </Link>
            </div>
            <div className="text-center space-y-4 fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Clock className="w-12 h-12 text-[hsl(var(--delivery-orange))] mx-auto" />
              <h3 className="font-semibold text-[hsl(var(--logistics-blue))]">Delivery Times</h3>
              <p className="text-sm text-[hsl(var(--professional-gray))]">Check service hours and delivery windows</p>
              <Link to="/services">
                <Button variant="outline" className="border-[hsl(var(--logistics-blue))] text-[hsl(var(--logistics-blue))]">
                  View Hours
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[hsl(var(--professional-gray-lighter))]">
        <div className="container-logistics">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-[hsl(var(--professional-gray))]">
                Find answers to the most common tracking questions
              </p>
            </div>

            <div className="fade-in-up">
              <Accordion type="single" collapsible className="space-y-4">
                {faqData.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-white border border-[hsl(var(--professional-gray-light))] rounded-lg px-6 shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-semibold text-[hsl(var(--logistics-blue))] hover:text-[hsl(var(--delivery-orange))] transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[hsl(var(--professional-gray))] leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-20 bg-white">
        <div className="container-logistics text-center">
          <div className="space-y-6 fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--logistics-blue))]">
              Still Need Help?
            </h2>
            <p className="text-xl text-[hsl(var(--professional-gray))] max-w-2xl mx-auto">
              Our customer support team is available 24/7 to assist you with any tracking questions or concerns.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/contact">
                <Button variant="logistics" size="lg">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="tracking" size="lg">
                  Live Chat
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

export default TrackingFAQ;