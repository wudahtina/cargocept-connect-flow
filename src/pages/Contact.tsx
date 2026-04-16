import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, User, Globe, Headphones } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
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
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. Our team will get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] text-white">
        <div className="container-logistics">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl lg:text-6xl font-bold">Get In Touch</h1>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
              Have questions about shipping? Need a quote? Our logistics experts are here to help you 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container-logistics">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: <MapPin className="w-7 h-7 text-white" />,
                title: "Our Office",
                lines: ["80 Park End St, Broom Hill", "BH21 0XW, United Kingdom"],
              },
              {
                icon: <Phone className="w-7 h-7 text-white" />,
                title: "Phone",
                lines: ["+44 70 8897 8089", "Mon–Fri: 8AM – 6PM", "Sat–Sun: 9AM – 4PM"],
              },
              {
                icon: <Mail className="w-7 h-7 text-white" />,
                title: "Email",
                lines: ["info@cargocept.org", "support@cargocept.org", "sales@cargocept.org"],
              },
              {
                icon: <Headphones className="w-7 h-7 text-white" />,
                title: "Live Support",
                lines: ["24/7 Online Chat", "Response within 5 min"],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300 h-full border-0 shadow-md">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[hsl(var(--logistics-blue))] mb-3">{item.title}</h3>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-sm text-muted-foreground leading-relaxed">{line}</p>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16 bg-secondary/30">
        <div className="container-logistics">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-[hsl(var(--logistics-blue))] flex items-center">
                    <Send className="mr-3 h-6 w-6" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold flex items-center">
                          <User className="w-4 h-4 mr-1" />Full Name *
                        </Label>
                        <Input placeholder="Your full name" value={formData.name} onChange={(e) => updateFormData('name', e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold flex items-center">
                          <Mail className="w-4 h-4 mr-1" />Email *
                        </Label>
                        <Input type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} required />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold flex items-center">
                          <Phone className="w-4 h-4 mr-1" />Phone
                        </Label>
                        <Input placeholder="+44 123 456 7890" value={formData.phone} onChange={(e) => updateFormData('phone', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Subject *</Label>
                        <Input placeholder="How can we help?" value={formData.subject} onChange={(e) => updateFormData('subject', e.target.value)} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Message *</Label>
                      <Textarea placeholder="Tell us about your shipping needs..." value={formData.message} onChange={(e) => updateFormData('message', e.target.value)} className="min-h-32" required />
                    </div>
                    <Button type="submit" variant="logistics" size="lg" className="w-full">
                      <Send className="mr-2 h-4 w-4" />Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Google Maps Embed + Office Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card className="shadow-xl border-0 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl text-[hsl(var(--logistics-blue))] flex items-center">
                    <MapPin className="mr-3 h-6 w-6" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2528.5!2d-1.9!3d50.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4873a1c0b0b0b0b0%3A0x0!2sBroom%20Hill%2C%20Wimborne%20Minster!5e0!3m2!1sen!2suk!4v1700000000000"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Cargocept Office Location"
                    className="w-full"
                  />
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-bold text-[hsl(var(--logistics-blue))] flex items-center text-lg">
                    <Clock className="w-5 h-5 mr-2" />Office Hours
                  </h4>
                  <div className="space-y-3 text-sm">
                    {[
                      ["Monday – Friday", "8:00 AM – 6:00 PM"],
                      ["Saturday", "9:00 AM – 4:00 PM"],
                      ["Sunday", "9:00 AM – 4:00 PM"],
                    ].map(([day, hours], i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                        <span className="text-muted-foreground font-medium">{day}</span>
                        <span className="font-semibold text-foreground">{hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-[hsl(var(--logistics-blue))]/5 rounded-xl flex items-center gap-3">
                    <Globe className="w-5 h-5 text-[hsl(var(--logistics-blue))]" />
                    <p className="text-sm font-medium text-[hsl(var(--logistics-blue))]">
                      24/7 Customer Support Available Online
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 bg-white">
        <div className="container-logistics">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[hsl(var(--logistics-blue))] mb-4">Need Immediate Assistance?</h2>
            <p className="text-lg text-muted-foreground">Choose the best way to reach us</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <Phone className="w-6 h-6 text-white" />, title: "Emergency Shipments", desc: "Same-day delivery support", action: "Call Now", href: "tel:+447088978089", color: "bg-[hsl(var(--delivery-orange))]" },
              { icon: <Mail className="w-6 h-6 text-white" />, title: "General Inquiries", desc: "Questions about our services", action: "Email Us", href: "mailto:info@cargocept.org", color: "bg-[hsl(var(--logistics-blue))]" },
              { icon: <Globe className="w-6 h-6 text-white" />, title: "International", desc: "Global shipping enquiries", action: "Email Sales", href: "mailto:sales@cargocept.org", color: "bg-[hsl(var(--delivery-orange))]" },
              { icon: <Headphones className="w-6 h-6 text-white" />, title: "24/7 Live Chat", desc: "Instant online support", action: "Start Chat", href: "#", color: "bg-[hsl(var(--logistics-blue))]" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300 h-full border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-[hsl(var(--logistics-blue))] mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                    <Button variant="outline" size="sm" className="border-[hsl(var(--logistics-blue))] text-[hsl(var(--logistics-blue))]" asChild>
                      <a href={item.href}>{item.action}</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
