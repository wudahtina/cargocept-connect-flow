import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Package, Search, ChevronDown, Truck, Globe, Clock, HeadphonesIcon, FileText, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

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
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors font-medium">
              Home
            </Link>
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors font-medium">
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-[hsl(var(--border))] shadow-lg">
                <DropdownMenuItem asChild>
                  <Link to="/services" className="flex items-center">
                    <Truck className="mr-2 h-4 w-4" />
                    Express Delivery
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services" className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    International Shipping
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services" className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Same-day Delivery
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services" className="flex items-center">
                    <Package className="mr-2 h-4 w-4" />
                    Freight Transport
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tracking Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors font-medium">
                Tracking <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-[hsl(var(--border))] shadow-lg">
                <DropdownMenuItem asChild>
                  <Link to="/track" className="flex items-center">
                    <Search className="mr-2 h-4 w-4" />
                    Track Shipment
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/tracking-faq" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Tracking FAQ
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Support Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors font-medium">
                Support <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-[hsl(var(--border))] shadow-lg">
                <DropdownMenuItem asChild>
                  <Link to="/contact" className="flex items-center">
                    <HeadphonesIcon className="mr-2 h-4 w-4" />
                    Customer Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about" className="flex items-center">
                    <Building className="mr-2 h-4 w-4" />
                    About Us
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Prominent Track Button */}
            <Link to="/track">
              <Button variant="outline" size="sm" className="border-[hsl(var(--dhl-red))] text-[hsl(var(--dhl-red))] hover:bg-[hsl(var(--dhl-red))] hover:text-white font-semibold">
                <Search className="mr-2 h-4 w-4" />
                Track Your Shipment
              </Button>
            </Link>
            
            {/* Global Search Icon */}
            <Button variant="ghost" size="sm" className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))]">
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/login">
              <Button variant="logistics" size="sm">
                Login / Sign Up
              </Button>
            </Link>
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
              <Link to="/" className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors">
                Home
              </Link>
              <Link to="/track" className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors">
                Track Shipment
              </Link>
              <Link to="/services" className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors">
                Services
              </Link>
              <Link to="/about" className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-[hsl(var(--professional-gray))] hover:text-[hsl(var(--logistics-blue))] transition-colors">
                Contact
              </Link>
              <Link to="/login">
                <Button variant="logistics" size="sm" className="w-fit">
                  Login / Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;