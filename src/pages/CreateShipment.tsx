import { useState } from "react";
import { Package, MapPin, Weight, Calendar, ArrowRight, FileText, CheckCircle, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const CreateShipment = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Sender info
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    senderAddress: "",
    senderCity: "",
    senderPostcode: "",
    
    // Recipient info
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    recipientAddress: "",
    recipientCity: "",
    recipientPostcode: "",
    
    // Package info
    packageType: "",
    weight: "",
    dimensions: "",
    value: "",
    description: "",
    specialInstructions: "",
    
    // Service options
    serviceType: "",
    deliveryDate: "",
    insurance: false,
    signature: false
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const calculatePrice = () => {
    const baseRate = 15;
    const weight = parseFloat(formData.weight) || 1;
    const serviceMultiplier = {
      "same-day": 3.5,
      "express": 2.5,
      "standard": 1.5,
      "economy": 1.0
    }[formData.serviceType as keyof typeof serviceMultiplier] || 1.5;
    
    let price = baseRate * weight * serviceMultiplier;
    if (formData.insurance) price += 5;
    if (formData.signature) price += 3;
    
    return Math.round(price * 100) / 100;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] text-white">
        <div className="container-logistics">
          <div className="text-center space-y-6 fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Create Shipment
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
              Fast and easy shipment creation. Get your packages moving 
              with just a few clicks.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white border-b">
        <div className="container-logistics">
          <div className="flex justify-center">
            <div className="flex items-center space-x-8">
              {[
                { num: 1, title: "Sender Details" },
                { num: 2, title: "Recipient Details" },
                { num: 3, title: "Package Info" },
                { num: 4, title: "Review & Confirm" }
              ].map((stepItem, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= stepItem.num 
                      ? 'bg-[hsl(var(--logistics-blue))] text-white' 
                      : 'bg-[hsl(var(--professional-gray-light))] text-[hsl(var(--professional-gray))]'
                  }`}>
                    {stepItem.num}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className={`text-sm font-medium ${
                      step >= stepItem.num 
                        ? 'text-[hsl(var(--logistics-blue))]' 
                        : 'text-[hsl(var(--professional-gray))]'
                    }`}>
                      {stepItem.title}
                    </p>
                  </div>
                  {index < 3 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      step > stepItem.num 
                        ? 'bg-[hsl(var(--logistics-blue))]' 
                        : 'bg-[hsl(var(--professional-gray-light))]'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-[hsl(var(--professional-gray-lighter))]">
        <div className="container-logistics">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-[hsl(var(--logistics-blue))] flex items-center">
                  <Package className="mr-3 h-6 w-6" />
                  {step === 1 && "Sender Information"}
                  {step === 2 && "Recipient Information"}
                  {step === 3 && "Package Details"}
                  {step === 4 && "Review & Invoice"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Step 1: Sender Details */}
                {step === 1 && (
                  <div className="grid md:grid-cols-2 gap-6 fade-in-up">
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Full Name *</Label>
                      <Input
                        placeholder="John Doe"
                        value={formData.senderName}
                        onChange={(e) => updateFormData('senderName', e.target.value)}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Phone Number *</Label>
                      <Input
                        placeholder="+44 123 456 7890"
                        value={formData.senderPhone}
                        onChange={(e) => updateFormData('senderPhone', e.target.value)}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Email Address *</Label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.senderEmail}
                        onChange={(e) => updateFormData('senderEmail', e.target.value)}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Postcode *</Label>
                      <Input
                        placeholder="SW1A 1AA"
                        value={formData.senderPostcode}
                        onChange={(e) => updateFormData('senderPostcode', e.target.value)}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Address *</Label>
                      <Input
                        placeholder="123 Main Street"
                        value={formData.senderAddress}
                        onChange={(e) => updateFormData('senderAddress', e.target.value)}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">City *</Label>
                      <Input
                        placeholder="London"
                        value={formData.senderCity}
                        onChange={(e) => updateFormData('senderCity', e.target.value)}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Recipient Details */}
                {step === 2 && (
                  <div className="grid md:grid-cols-2 gap-6 fade-in-up">
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Full Name *</Label>
                      <Input
                        placeholder="Jane Smith"
                        value={formData.recipientName}
                        onChange={(e) => updateFormData('recipientName', e.target.value)}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Phone Number *</Label>
                      <Input
                        placeholder="+44 987 654 3210"
                        value={formData.recipientPhone}
                        onChange={(e) => updateFormData('recipientPhone', e.target.value)}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Email Address</Label>
                      <Input
                        type="email"
                        placeholder="jane@example.com"
                        value={formData.recipientEmail}
                        onChange={(e) => updateFormData('recipientEmail', e.target.value)}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Postcode *</Label>
                      <Input
                        placeholder="B1 1AA"
                        value={formData.recipientPostcode}
                        onChange={(e) => updateFormData('recipientPostcode', e.target.value)}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Address *</Label>
                      <Input
                        placeholder="456 High Street"
                        value={formData.recipientAddress}
                        onChange={(e) => updateFormData('recipientAddress', e.target.value)}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">City *</Label>
                      <Input
                        placeholder="Birmingham"
                        value={formData.recipientCity}
                        onChange={(e) => updateFormData('recipientCity', e.target.value)}
                        className="border-[hsl(var(--logistics-blue))]"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Package Details */}
                {step === 3 && (
                  <div className="space-y-6 fade-in-up">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Package Type *</Label>
                        <Select value={formData.packageType} onValueChange={(value) => updateFormData('packageType', value)}>
                          <SelectTrigger className="border-[hsl(var(--logistics-blue))]">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="document">Document</SelectItem>
                            <SelectItem value="package">Package</SelectItem>
                            <SelectItem value="fragile">Fragile Item</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold flex items-center">
                          <Weight className="w-4 h-4 mr-1" />
                          Weight (kg) *
                        </Label>
                        <Input
                          type="number"
                          placeholder="2.5"
                          value={formData.weight}
                          onChange={(e) => updateFormData('weight', e.target.value)}
                          className="border-[hsl(var(--logistics-blue))]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Dimensions (cm)</Label>
                        <Input
                          placeholder="30 x 20 x 10"
                          value={formData.dimensions}
                          onChange={(e) => updateFormData('dimensions', e.target.value)}
                          className="border-[hsl(var(--logistics-blue))]"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Declared Value (£)</Label>
                        <Input
                          type="number"
                          placeholder="100"
                          value={formData.value}
                          onChange={(e) => updateFormData('value', e.target.value)}
                          className="border-[hsl(var(--logistics-blue))]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Service Type *</Label>
                        <Select value={formData.serviceType} onValueChange={(value) => updateFormData('serviceType', value)}>
                          <SelectTrigger className="border-[hsl(var(--logistics-blue))]">
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="same-day">Same-day Delivery</SelectItem>
                            <SelectItem value="express">Express (24-48h)</SelectItem>
                            <SelectItem value="standard">Standard (3-5 days)</SelectItem>
                            <SelectItem value="economy">Economy (5-7 days)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Package Description *</Label>
                        <Textarea
                          placeholder="Describe the contents of your package"
                          value={formData.description}
                          onChange={(e) => updateFormData('description', e.target.value)}
                          className="border-[hsl(var(--logistics-blue))]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Special Instructions</Label>
                        <Textarea
                          placeholder="Any special handling requirements"
                          value={formData.specialInstructions}
                          onChange={(e) => updateFormData('specialInstructions', e.target.value)}
                          className="border-[hsl(var(--logistics-blue))]"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-[hsl(var(--logistics-blue))] font-semibold">Additional Options</Label>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="insurance" 
                            checked={formData.insurance}
                            onCheckedChange={(checked) => updateFormData('insurance', checked)}
                          />
                          <label htmlFor="insurance" className="text-sm">
                            Insurance Coverage (+£5)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="signature" 
                            checked={formData.signature}
                            onCheckedChange={(checked) => updateFormData('signature', checked)}
                          />
                          <label htmlFor="signature" className="text-sm">
                            Signature Required (+£3)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Invoice */}
                {step === 4 && !submitted && (
                  <div className="space-y-6 fade-in-up">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Invoice Summary */}
                      <div>
                        <h3 className="text-lg font-semibold text-[hsl(var(--logistics-blue))] mb-4 flex items-center">
                          <FileText className="w-5 h-5 mr-2" />
                          Invoice Summary
                        </h3>
                        <Card className="border-[hsl(var(--logistics-blue))] border-2">
                          <CardContent className="p-6 space-y-4">
                            <div className="text-xs text-[hsl(var(--professional-gray))] mb-2">
                              Invoice Ref: INV-{Date.now().toString().slice(-8)}
                            </div>
                            <div className="flex justify-between">
                              <span>Service Type:</span>
                              <span className="font-medium capitalize">{formData.serviceType?.replace('-', ' ')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Weight:</span>
                              <span className="font-medium">{formData.weight} kg</span>
                            </div>
                            <div className="flex justify-between">
                              <span>From:</span>
                              <span className="font-medium">{formData.senderCity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>To:</span>
                              <span className="font-medium">{formData.recipientCity}</span>
                            </div>
                            {formData.insurance && (
                              <div className="flex justify-between">
                                <span>Insurance:</span>
                                <span className="font-medium">£5.00</span>
                              </div>
                            )}
                            {formData.signature && (
                              <div className="flex justify-between">
                                <span>Signature Required:</span>
                                <span className="font-medium">£3.00</span>
                              </div>
                            )}
                            <div className="border-t pt-4">
                              <div className="flex justify-between text-lg font-bold text-[hsl(var(--logistics-blue))]">
                                <span>Estimated Total:</span>
                                <span>£{calculatePrice()}</span>
                              </div>
                              <p className="text-xs text-[hsl(var(--professional-gray))] mt-1">
                                * Payment will be collected upon invoice receipt
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Shipment Details */}
                      <div>
                        <h3 className="text-lg font-semibold text-[hsl(var(--logistics-blue))] mb-4">Shipment Details</h3>
                        <Card>
                          <CardContent className="p-6 space-y-3 text-sm">
                            <div>
                              <span className="font-semibold text-[hsl(var(--logistics-blue))]">Sender:</span>
                              <p>{formData.senderName}</p>
                              <p>{formData.senderAddress}, {formData.senderCity} {formData.senderPostcode}</p>
                              <p>{formData.senderEmail}</p>
                            </div>
                            <div className="border-t pt-3">
                              <span className="font-semibold text-[hsl(var(--logistics-blue))]">Recipient:</span>
                              <p>{formData.recipientName}</p>
                              <p>{formData.recipientAddress}, {formData.recipientCity} {formData.recipientPostcode}</p>
                            </div>
                            <div className="border-t pt-3">
                              <span className="font-semibold text-[hsl(var(--logistics-blue))]">Package:</span>
                              <p className="capitalize">{formData.packageType} — {formData.weight} kg</p>
                              <p>{formData.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submission Confirmation */}
                {submitted && (
                  <div className="text-center space-y-6 py-8 fade-in-up">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[hsl(var(--logistics-blue))]">
                      Shipment Booked Successfully!
                    </h3>
                    <div className="max-w-lg mx-auto space-y-3">
                      <div className="flex items-center justify-center gap-2 text-[hsl(var(--professional-gray))]">
                        <Mail className="w-5 h-5 text-[hsl(var(--delivery-orange))]" />
                        <p className="text-lg">
                          You will receive the invoice at <strong className="text-[hsl(var(--logistics-blue))]">{formData.senderEmail}</strong>
                        </p>
                      </div>
                      <p className="text-[hsl(var(--professional-gray))]">
                        Your delivery will be scheduled as soon as possible. Our team will be in touch shortly with your tracking details.
                      </p>
                      <div className="bg-[hsl(var(--professional-gray-lighter))] rounded-lg p-4 mt-4">
                        <p className="text-sm text-[hsl(var(--professional-gray))]">Estimated Total</p>
                        <p className="text-2xl font-bold text-[hsl(var(--logistics-blue))]">£{calculatePrice()}</p>
                        <p className="text-xs text-[hsl(var(--professional-gray))] mt-1">Payable upon invoice receipt — no upfront payment required</p>
                      </div>
                    </div>
                    <Button variant="logistics" size="lg" onClick={() => window.location.href = '/'}>
                      Back to Home
                    </Button>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-[hsl(var(--professional-gray-light))]">
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    disabled={step === 1}
                    className="border-[hsl(var(--logistics-blue))] text-[hsl(var(--logistics-blue))]"
                  >
                    Previous
                  </Button>
                  
                  {step < 4 ? (
                    <Button variant="logistics" onClick={nextStep}>
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="delivery" size="lg">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Create Shipment
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreateShipment;