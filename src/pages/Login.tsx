import { useState } from "react";
import { User, Lock, Mail, Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false
  });
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false
  });

  const updateLoginData = (field: string, value: any) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const updateSignupData = (field: string, value: any) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", loginData);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup:", signupData);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] text-white">
        <div className="container-logistics">
          <div className="text-center space-y-6 fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Welcome Back
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
              Access your Cargocept account to manage shipments, track packages, 
              and enjoy personalized logistics services.
            </p>
          </div>
        </div>
      </section>

      {/* Login/Signup Forms */}
      <section className="py-16 bg-[hsl(var(--professional-gray-lighter))]">
        <div className="container-logistics">
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-[hsl(var(--logistics-blue))]">
                  Account Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login" className="flex items-center">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="flex items-center">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  {/* Login Tab */}
                  <TabsContent value="login" className="space-y-6 fade-in-up">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          Email Address
                        </Label>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          value={loginData.email}
                          onChange={(e) => updateLoginData('email', e.target.value)}
                          className="border-[hsl(var(--logistics-blue))]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold flex items-center">
                          <Lock className="w-4 h-4 mr-1" />
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e) => updateLoginData('password', e.target.value)}
                            className="border-[hsl(var(--logistics-blue))] pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--professional-gray))]"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="remember" 
                            checked={loginData.remember}
                            onCheckedChange={(checked) => updateLoginData('remember', checked)}
                          />
                          <label htmlFor="remember" className="text-sm text-[hsl(var(--professional-gray))]">
                            Remember me
                          </label>
                        </div>
                        <Button variant="link" className="text-[hsl(var(--delivery-orange))] p-0 h-auto">
                          Forgot password?
                        </Button>
                      </div>

                      <Button type="submit" variant="logistics" size="lg" className="w-full">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </form>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[hsl(var(--professional-gray-light))]"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-[hsl(var(--professional-gray))]">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="border-[hsl(var(--logistics-blue))] text-[hsl(var(--logistics-blue))]">
                        Google
                      </Button>
                      <Button variant="outline" className="border-[hsl(var(--logistics-blue))] text-[hsl(var(--logistics-blue))]">
                        Microsoft
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Signup Tab */}
                  <TabsContent value="signup" className="space-y-6 fade-in-up">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-[hsl(var(--logistics-blue))] font-semibold">
                            First Name
                          </Label>
                          <Input
                            placeholder="John"
                            value={signupData.firstName}
                            onChange={(e) => updateSignupData('firstName', e.target.value)}
                            className="border-[hsl(var(--logistics-blue))]"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[hsl(var(--logistics-blue))] font-semibold">
                            Last Name
                          </Label>
                          <Input
                            placeholder="Doe"
                            value={signupData.lastName}
                            onChange={(e) => updateSignupData('lastName', e.target.value)}
                            className="border-[hsl(var(--logistics-blue))]"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          Email Address
                        </Label>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          value={signupData.email}
                          onChange={(e) => updateSignupData('email', e.target.value)}
                          className="border-[hsl(var(--logistics-blue))]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold">
                          Phone Number
                        </Label>
                        <Input
                          placeholder="+44 123 456 7890"
                          value={signupData.phone}
                          onChange={(e) => updateSignupData('phone', e.target.value)}
                          className="border-[hsl(var(--logistics-blue))]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold flex items-center">
                          <Lock className="w-4 h-4 mr-1" />
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            value={signupData.password}
                            onChange={(e) => updateSignupData('password', e.target.value)}
                            className="border-[hsl(var(--logistics-blue))] pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--professional-gray))]"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[hsl(var(--logistics-blue))] font-semibold">
                          Confirm Password
                        </Label>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={signupData.confirmPassword}
                          onChange={(e) => updateSignupData('confirmPassword', e.target.value)}
                          className="border-[hsl(var(--logistics-blue))]"
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="terms" 
                          checked={signupData.terms}
                          onCheckedChange={(checked) => updateSignupData('terms', checked)}
                          required
                        />
                        <label htmlFor="terms" className="text-sm text-[hsl(var(--professional-gray))]">
                          I agree to the{" "}
                          <Button variant="link" className="text-[hsl(var(--delivery-orange))] p-0 h-auto text-sm">
                            Terms of Service
                          </Button>
                          {" "}and{" "}
                          <Button variant="link" className="text-[hsl(var(--delivery-orange))] p-0 h-auto text-sm">
                            Privacy Policy
                          </Button>
                        </label>
                      </div>

                      <Button type="submit" variant="delivery" size="lg" className="w-full">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Account
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container-logistics">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-3xl font-bold text-[hsl(var(--logistics-blue))] mb-4">
              Why Create an Account?
            </h2>
            <p className="text-xl text-[hsl(var(--professional-gray))]">
              Unlock exclusive features and streamlined shipping experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow fade-in-up">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[hsl(var(--logistics-blue))] mb-2">
                  Personalized Dashboard
                </h3>
                <p className="text-[hsl(var(--professional-gray))] text-sm leading-relaxed">
                  Manage all your shipments, tracking, and account settings in one convenient location.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[hsl(var(--logistics-blue))] mb-2">
                  Secure Operations
                </h3>
                <p className="text-[hsl(var(--professional-gray))] text-sm leading-relaxed">
                  Enhanced security for your shipments with encrypted data and secure payment processing.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[hsl(var(--logistics-blue))] mb-2">
                  Smart Notifications
                </h3>
                <p className="text-[hsl(var(--professional-gray))] text-sm leading-relaxed">
                  Real-time updates via email and SMS about your package status and delivery confirmations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;