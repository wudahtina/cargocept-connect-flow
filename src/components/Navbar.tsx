import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Package, Search, ChevronDown, Truck, Globe, Clock, HeadphonesIcon, FileText, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container-logistics">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Package className="h-8 w-8 text-primary" />
            <span className="ml-2 text-2xl font-bold text-primary">Cargocept</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">Home</Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-muted-foreground hover:text-primary transition-colors font-medium">
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border shadow-lg">
                <DropdownMenuItem asChild>
                  <Link to="/services" className="flex items-center"><Truck className="mr-2 h-4 w-4" />Express Delivery</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services" className="flex items-center"><Globe className="mr-2 h-4 w-4" />International Shipping</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services" className="flex items-center"><Clock className="mr-2 h-4 w-4" />Same-day Delivery</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services" className="flex items-center"><Package className="mr-2 h-4 w-4" />Freight Transport</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">About</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">Contact</Link>

            <Link to="/track">
              <Button variant="outline" size="sm" className="border-[hsl(var(--dhl-red))] text-[hsl(var(--dhl-red))] hover:bg-[hsl(var(--dhl-red))] hover:text-white font-semibold">
                <Search className="mr-2 h-4 w-4" />Track Shipment
              </Button>
            </Link>

            <Link to="/book">
              <Button variant="logistics" size="sm">Book Shipment</Button>
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-muted-foreground hover:text-primary">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Services</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>About</Link>
              <Link to="/track" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Track Shipment</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
              <Link to="/book" onClick={() => setIsOpen(false)}>
                <Button variant="logistics" size="sm" className="w-fit">Book Shipment</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
