import { useState } from "react";
import { Menu, X, Package, MapPin, Users, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[hsl(var(--border))] z-50">
      <div className="container-logistics">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Package className="h-8 w-8 text-[hsl(var(--logistics-blue))]" />
            <span className="ml-2 text-2xl font-bold text-[hsl(var(--logistics-blue))]">
              Cargocept
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#tracking" className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors">
              Track Shipment
            </a>
            <a href="#services" className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors">
              Services
            </a>
            <a href="#about" className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors">
              About
            </a>
            <a href="#contact" className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors">
              Contact
            </a>
            <Button variant="logistics" size="sm">
              Login / Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[hsl(var(--border))]">
            <div className="flex flex-col space-y-4">
              <a href="#tracking" className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors">
                Track Shipment
              </a>
              <a href="#services" className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors">
                Services
              </a>
              <a href="#about" className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors">
                About
              </a>
              <a href="#contact" className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors">
                Contact
              </a>
              <Button variant="logistics" size="sm" className="w-fit">
                Login / Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;