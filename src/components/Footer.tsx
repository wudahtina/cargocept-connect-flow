import { Package, MapPin, Phone, Mail, Clock, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--logistics-blue-dark))] text-white">
      <div className="container-logistics py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-accent" />
              <span className="ml-2 text-2xl font-bold">Cargocept</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Your trusted logistics partner for fast, reliable, and secure delivery solutions worldwide.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-accent hover:bg-white/10"><Twitter className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-accent hover:bg-white/10"><Linkedin className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-accent hover:bg-white/10"><Instagram className="h-5 w-5" /></Button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-accent">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/track" className="text-white/80 hover:text-white transition-colors">Track Shipment</Link></li>
              <li><Link to="/book" className="text-white/80 hover:text-white transition-colors">Book Shipment</Link></li>
              <li><Link to="/services" className="text-white/80 hover:text-white transition-colors">Our Services</Link></li>
              <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-accent">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/tracking-faq" className="text-white/80 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/services" className="text-white/80 hover:text-white transition-colors">Shipping Guide</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-accent">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-white/80"><p>80 Park End St, Broom Hill</p><p>BH21 0XW, United Kingdom</p></div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-white/80">+44 70 8897 8089</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-white/80">info@cargocept.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-white/80">24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">© 2025 Cargocept. All rights reserved.</div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
