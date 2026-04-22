import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Package, CheckCircle, Mail } from "lucide-react";
import { addBooking } from "@/lib/store";

const BookShipment = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    pickupLocation: "",
    destination: "",
    packageDetails: "",
    notes: "",
  });

  const update = (field: string, value: string) => setForm(p => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.pickupLocation || !form.destination || !form.packageDetails) return;
    const success = await addBooking(form);
    if (success) setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="py-16 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container-logistics text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Book a Shipment</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">Fill in your details and our team will arrange everything for you.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container-logistics max-w-2xl">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
              <Card className="border-0 shadow-xl rounded-2xl">
                <CardContent className="p-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">Request Received!</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Your shipment request has been received. Our team will contact you shortly to confirm the details and schedule your delivery.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-secondary rounded-xl p-4">
                    <Mail className="w-4 h-4" />
                    You will receive a confirmation at <span className="font-semibold text-foreground">{form.email}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="border-0 shadow-xl rounded-2xl">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl text-primary flex items-center justify-center gap-2">
                    <Package className="w-6 h-6" /> Shipment Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <Input placeholder="John Smith" value={form.fullName} onChange={e => update("fullName", e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label>Email *</Label>
                        <Input type="email" placeholder="john@example.com" value={form.email} onChange={e => update("email", e.target.value)} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number *</Label>
                      <Input type="tel" placeholder="+44 7000 000000" value={form.phone} onChange={e => update("phone", e.target.value)} required />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Pickup Location *</Label>
                        <Input placeholder="London, UK" value={form.pickupLocation} onChange={e => update("pickupLocation", e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label>Destination *</Label>
                        <Input placeholder="Manchester, UK" value={form.destination} onChange={e => update("destination", e.target.value)} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Package Details *</Label>
                      <Textarea placeholder="Describe your package (size, weight, contents...)" value={form.packageDetails} onChange={e => update("packageDetails", e.target.value)} rows={3} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Additional Notes</Label>
                      <Textarea placeholder="Any special instructions..." value={form.notes} onChange={e => update("notes", e.target.value)} rows={2} />
                    </div>
                    <Button type="submit" variant="logistics" size="lg" className="w-full h-12 text-base">
                      Submit Booking Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookShipment;
