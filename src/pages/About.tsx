import { useState, useEffect, useRef } from "react";
import { Package, Users, Globe, Clock, Star, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, useInView } from "framer-motion";
import { getTestimonials, addTestimonial, type Testimonial } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const AnimatedCounter = ({ end, suffix = "", label, icon: Icon }: { end: number; suffix?: string; label: string; icon: any }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let step = 0;
    const steps = 60;
    const timer = setInterval(() => {
      step++;
      setCount(Math.min(Math.round((end * step) / steps * 10) / 10, end));
      if (step >= steps) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
      <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
        <CardContent className="p-8 text-center">
          <Icon className="w-10 h-10 text-accent mx-auto mb-4" />
          <div className="text-4xl font-bold text-primary mb-2">
            {typeof end === "number" && end % 1 !== 0 ? count.toFixed(1) : Math.round(count).toLocaleString()}{suffix}
          </div>
          <div className="text-muted-foreground font-medium">{label}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const About = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [reviewForm, setReviewForm] = useState({ name: "", message: "", rating: 5 });

  useEffect(() => {
    const loadTestimonials = async () => {
      const t = await getTestimonials();
      setTestimonials(t);
    };
    loadTestimonials();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.message) return;
    const success = await addTestimonial(reviewForm);
    if (success) {
      const updated = await getTestimonials();
      setTestimonials(updated);
      setReviewForm({ name: "", message: "", rating: 5 });
      toast({ title: "Thank you!", description: "Your testimonial has been submitted." });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container-logistics text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">About Cargocept</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">Pioneering the future of logistics since 2015 — with reliability, speed, and trust at the core of everything we do.</p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container-logistics max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">Our Story</h2>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>Founded in 2015, our company began with a clear vision — to simplify global shipping while maintaining speed, reliability, and trust. What started as a small logistics operation has steadily grown into a dependable shipping partner serving individuals and businesses across multiple countries.</p>
              <p>From the very beginning, our focus has been on efficiency and transparency. We understand that every package carries value, whether it's personal or commercial, and that's why we've built our processes around real-time tracking, timely delivery, and consistent communication.</p>
              <p>Over the years, we've expanded our network, strengthened our operations, and refined our systems to meet the growing demands of global logistics. Today, we are proud to support shipments across continents while maintaining the same commitment to excellence that defined us at the start.</p>
              <p className="font-medium text-foreground">Our mission remains simple — to deliver every package safely, on time, and with complete reliability.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-secondary/50">
        <div className="container-logistics">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground">Trusted by thousands of businesses worldwide</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedCounter end={50000000} suffix="+" label="Packages Delivered" icon={Package} />
            <AnimatedCounter end={195} suffix="+" label="Countries Served" icon={Globe} />
            <AnimatedCounter end={99.9} suffix="%" label="Reliability Rate" icon={Clock} />
            <AnimatedCounter end={24} suffix="/7" label="Customer Support" icon={Users} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container-logistics">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground">Real feedback from real customers</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {testimonials.slice(0, 6).map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="border-0 shadow-md rounded-2xl hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} className={`w-4 h-4 ${si < t.rating ? "fill-accent text-accent" : "text-muted"}`} />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">"{t.message}"</p>
                    <div className="pt-2 border-t border-border">
                      <p className="font-semibold text-foreground">{t.name}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Submit Review */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-lg mx-auto">
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-primary mb-6 text-center">Share Your Experience</h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Your Name *</Label>
                    <Input placeholder="John Smith" value={reviewForm.name} onChange={e => setReviewForm(p => ({ ...p, name: e.target.value }))} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Your Review *</Label>
                    <Textarea placeholder="Tell us about your experience..." value={reviewForm.message} onChange={e => setReviewForm(p => ({ ...p, message: e.target.value }))} rows={3} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(r => (
                        <button key={r} type="button" onClick={() => setReviewForm(p => ({ ...p, rating: r }))}>
                          <Star className={`w-6 h-6 cursor-pointer transition-colors ${r <= reviewForm.rating ? "fill-accent text-accent" : "text-muted"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" variant="logistics" className="w-full">
                    <Send className="w-4 h-4 mr-2" /> Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
