import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] text-white">
        <div className="container-logistics">
          <div className="text-center space-y-6 fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Contact Us
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
              Get in touch with our logistics experts. We're here to help 
              with all your shipping and delivery needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container-logistics">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow fade-in-up">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[hsl(var(--logistics-blue))] mb-2">Visit Our Office</h3>
                <p className="text-[hsl(var(--professional-gray))] text-sm leading-relaxed">
                  80 Park End St, Broom Hill<br />
                  BH21 0XW, United Kingdom
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[hsl(var(--logistics-blue))] mb-2">Call Us</h3>
                <p className="text-[hsl(var(--professional-gray))] text-sm leading-relaxed">
                  +44 70 8897 8089<br />
                  Mon-Fri: 8:00 AM - 6:00 PM<br />
                  Sat-Sun: 9:00 AM - 4:00 PM
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[hsl(var(--logistics-blue))] mb-2">Email Us</h3>
                <p className="text-[hsl(var(--professional-gray))] text-sm leading-relaxed">
                  info@cargocept.org<br />
                  support@cargocept.org<br />
                  sales@cargocept.org
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-[hsl(var(--professional-gray-lighter))]">
        <div className="container-logistics">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="fade-in-up">
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-[hsl(var(--logistics-blue))] flex items-center">
                    <Send className="mr-3 h-6 w-6" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          Full Name *
                        </Label>
                        <Input
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
                          className="border-[hsl(var(--logistics-blue))]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          Email Address *
                        </Label>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          className="border-[hsl(var(--logistics-blue))]"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          Phone Number
                        </Label>
                        <Input
                          placeholder="+44 123 456 7890"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          className="border-[hsl(var(--logistics-blue))]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold">
                          Subject *
                        </Label>
                        <Input
                          placeholder="How can we help you?"
                          value={formData.subject}
                          onChange={(e) => updateFormData('subject', e.target.value)}
                          className="border-[hsl(var(--logistics-blue))]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">
                        Message *
                      </Label>
                      <Textarea
                        placeholder="Tell us about your shipping needs or any questions you have..."
                        value={formData.message}
                        onChange={(e) => updateFormData('message', e.target.value)}
                        className="border-[hsl(var(--logistics-blue))] min-h-32"
                        required
                      />
                    </div>

                    <Button type="submit" variant="logistics" size="lg" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Interactive Map */}
            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Card className="h-full shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-[hsl(var(--logistics-blue))] flex items-center">
                    <MapPin className="mr-3 h-6 w-6" />
                    Find Us Here
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative h-96 bg-gradient-to-br from-[hsl(var(--logistics-blue-light))] to-[hsl(var(--delivery-orange-light))] rounded-lg overflow-hidden">
                    {/* Simulated Map */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-[hsl(var(--delivery-orange))] rounded-full flex items-center justify-center mx-auto animate-logistics-pulse">
                          <MapPin className="w-8 h-8 text-white" />
                        </div>
                        <div className="space-y-2 text-[hsl(var(--logistics-blue))]">
                          <h3 className="text-lg font-semibold">Cargocept Headquarters</h3>
                          <p className="text-sm">80 Park End St, Broom Hill</p>
                          <p className="text-sm">BH21 0XW, United Kingdom</p>
                        </div>
                        <Button 
                          variant="delivery" 
                          size="sm"
                          onClick={() => window.open('https://maps.google.com/?q=80+Park+End+St,+Broom+Hill,+BH21+0XW,+United+Kingdom', '_blank')}
                        >
                          View on Google Maps
                        </Button>
                      </div>
                    </div>
                    
                    {/* Map Grid Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="grid grid-cols-8 grid-rows-6 h-full">
                        {Array.from({ length: 48 }).map((_, i) => (
                          <div key={i} className="border border-[hsl(var(--logistics-blue))]"></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="mt-6 space-y-3">
                    <h4 className="font-semibold text-[hsl(var(--logistics-blue))] flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Office Hours
                    </h4>
                    <div className="space-y-2 text-sm text-[hsl(var(--professional-gray))]">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span className="font-medium">8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span className="font-medium">9:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span className="font-medium">9:00 AM - 4:00 PM</span>
                      </div>
                    </div>
                    <div className="p-3 bg-[hsl(var(--logistics-blue-light))] rounded-lg">
                      <p className="text-sm text-[hsl(var(--logistics-blue))] font-medium">
                        💡 24/7 Customer Support Available Online
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 bg-white">
        <div className="container-logistics">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-3xl font-bold text-[hsl(var(--logistics-blue))] mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-xl text-[hsl(var(--professional-gray))]">
              Choose the best way to reach us based on your needs
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow fade-in-up">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[hsl(var(--delivery-orange))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-[hsl(var(--logistics-blue))] mb-2">Emergency Shipments</h3>
                <p className="text-sm text-[hsl(var(--professional-gray))] mb-3">Same-day delivery support</p>
                <Button variant="outline" size="sm" className="border-[hsl(var(--delivery-orange))] text-[hsl(var(--delivery-orange))]">
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[hsl(var(--logistics-blue))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-[hsl(var(--logistics-blue))] mb-2">General Inquiries</h3>
                <p className="text-sm text-[hsl(var(--professional-gray))] mb-3">Questions about our services</p>
                <Button variant="outline" size="sm" className="border-[hsl(var(--logistics-blue))] text-[hsl(var(--logistics-blue))]">
                  Email Us
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[hsl(var(--delivery-orange))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-[hsl(var(--logistics-blue))] mb-2">Account Support</h3>
                <p className="text-sm text-[hsl(var(--professional-gray))] mb-3">Help with your account</p>
                <Button variant="outline" size="sm" className="border-[hsl(var(--logistics-blue))] text-[hsl(var(--logistics-blue))]">
                  Get Help
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow fade-in-up" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[hsl(var(--logistics-blue))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-[hsl(var(--logistics-blue))] mb-2">24/7 Live Chat</h3>
                <p className="text-sm text-[hsl(var(--professional-gray))] mb-3">Instant online support</p>
                <Button variant="delivery" size="sm">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;