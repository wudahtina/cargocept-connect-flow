import { useState } from "react";
import { Calculator, MapPin, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QuoteCalculator = () => {
  const [quote, setQuote] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    weight: "",
    dimensions: "",
    service: ""
  });

  const calculateQuote = () => {
    // Simple quote calculation logic
    const baseRate = 15;
    const weight = parseFloat(formData.weight) || 1;
    const serviceMultiplier = {
      "express": 2.5,
      "standard": 1.5,
      "economy": 1.0,
      "same-day": 3.5
    }[formData.service as keyof typeof serviceMultiplier] || 1.5;

    const calculatedQuote = baseRate * weight * serviceMultiplier;
    setQuote(Math.round(calculatedQuote * 100) / 100);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-logistics">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--logistics-blue))] mb-4">
            Live Shipping Quote Calculator
          </h2>
          <p className="text-xl text-[hsl(var(--professional-gray))] max-w-3xl mx-auto">
            Get instant shipping quotes for your packages. Enter your shipment details 
            and receive real-time pricing for all our services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-[hsl(var(--logistics-blue-light))] to-[hsl(var(--delivery-orange-light))] border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-[hsl(var(--logistics-blue))] flex items-center justify-center">
                <Calculator className="mr-3 h-6 w-6" />
                Calculate Shipping Cost
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white rounded-lg m-6 p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Form */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        From
                      </Label>
                      <Input
                        placeholder="Origin city"
                        value={formData.from}
                        onChange={(e) => setFormData({...formData, from: e.target.value})}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        To
                      </Label>
                      <Input
                        placeholder="Destination city"
                        value={formData.to}
                        onChange={(e) => setFormData({...formData, to: e.target.value})}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold flex items-center">
                        <Package className="w-4 h-4 mr-1" />
                        Weight (kg)
                      </Label>
                      <Input
                        type="number"
                        placeholder="0.5"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">
                        Dimensions (cm)
                      </Label>
                      <Input
                        placeholder="L x W x H"
                        value={formData.dimensions}
                        onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[hsl(var(--logistics-blue))] font-semibold">
                      Service Type
                    </Label>
                    <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                      <SelectTrigger className="border-[hsl(var(--logistics-blue))]">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="same-day">Same-day Delivery</SelectItem>
                        <SelectItem value="express">Express (24-48h)</SelectItem>
                        <SelectItem value="standard">Standard (3-5 days)</SelectItem>
                        <SelectItem value="economy">Economy (5-7 days)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    variant="logistics" 
                    size="lg" 
                    className="w-full"
                    onClick={calculateQuote}
                    disabled={!formData.from || !formData.to || !formData.weight || !formData.service}
                  >
                    Calculate Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Quote Result */}
                <div className="flex items-center justify-center">
                  {quote !== null ? (
                    <div className="text-center space-y-4 fade-in-up">
                      <div className="w-32 h-32 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-full flex items-center justify-center mx-auto animate-logistics-pulse">
                        <div className="text-white text-center">
                          <div className="text-sm font-medium">Estimated Cost</div>
                          <div className="text-2xl font-bold">${quote}</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[hsl(var(--professional-gray))] text-sm">
                          From: <span className="font-semibold">{formData.from}</span>
                        </p>
                        <p className="text-[hsl(var(--professional-gray))] text-sm">
                          To: <span className="font-semibold">{formData.to}</span>
                        </p>
                        <p className="text-[hsl(var(--professional-gray))] text-sm">
                          Service: <span className="font-semibold capitalize">{formData.service.replace('-', ' ')}</span>
                        </p>
                      </div>
                      <Button variant="delivery" className="mt-4">
                        Book This Shipment
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center text-[hsl(var(--professional-gray))]">
                      <Package className="w-24 h-24 mx-auto mb-4 opacity-30" />
                      <p className="text-lg">Enter shipment details to calculate your quote</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuoteCalculator;