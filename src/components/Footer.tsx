import { Package, MapPin, Phone, Mail, Clock, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--logistics-blue-dark))] text-white">
      <div className="container-logistics py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-[hsl(var(--delivery-orange))]" />
              <span className="ml-2 text-2xl font-bold">Cargocept</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Your trusted logistics partner for fast, reliable, and secure delivery solutions worldwide. 
              Experience excellence in shipping and logistics services.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-[hsl(var(--delivery-orange))] hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-[hsl(var(--delivery-orange))] hover:bg-white/10">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-[hsl(var(--delivery-orange))] hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[hsl(var(--delivery-orange))]">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/track" className="text-white/80 hover:text-white transition-colors">
                  Track Shipment
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/create-shipment" className="text-white/80 hover:text-white transition-colors">
                  Get Quote
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[hsl(var(--delivery-orange))]">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/tracking-faq" className="text-white/80 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-white transition-colors">
                  Shipping Guide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Claims & Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[hsl(var(--delivery-orange))]">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[hsl(var(--delivery-orange))] mt-0.5 flex-shrink-0" />
                <div className="text-white/80">
                  <p>80 Park End St, Broom Hill</p>
                  <p>BH21 0XW</p>
                  <p>United Kingdom</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[hsl(var(--delivery-orange))] flex-shrink-0" />
                <span className="text-white/80">+44 70 8897 8089</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[hsl(var(--delivery-orange))] flex-shrink-0" />
                <span className="text-white/80">info@cargocept.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-[hsl(var(--delivery-orange))] flex-shrink-0" />
                <span className="text-white/80">24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2024 Cargocept. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="text-white/60 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;