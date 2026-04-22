import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Package2, Truck, Search, Plus, Edit, Trash2,
  CheckCircle, AlertTriangle, ArrowUpRight, ArrowDownRight,
  MessageSquare, Inbox, Lock, Eye, EyeOff
} from "lucide-react";
import {
  getShipments, createShipment, updateShipment, deleteShipment, generateTrackingNumber,
  getBookings, updateBookingStatus,
  getTestimonials, addTestimonial, deleteTestimonial,
  type Shipment, type ShipmentStatus, type BookingRequest, type Testimonial
} from "@/lib/store";
import { supabase } from "@/lib/supabase";

const statusOptions: ShipmentStatus[] = ["Pending", "Processing", "Picked Up", "In Transit", "Out for Delivery", "Delivered"];
const bookingStatusOptions: BookingRequest["status"][] = ["New", "Contacted", "In Progress"];

const AdminDashboard = () => {
  const { toast } = useToast();
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const emptyForm = {
    trackingNumber: "", customerName: "", origin: "", destination: "",
    status: "Pending" as ShipmentStatus, timeline: [] as Shipment["timeline"],
    packageDescription: "", packageType: "", packageSize: ""
  };
  const [form, setForm] = useState(emptyForm);

  // Testimonial form
  const [tForm, setTForm] = useState({ name: "", message: "", rating: 5 });
  const [tDialogOpen, setTDialogOpen] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      
      if (profile?.role === "admin") {
        setAuthenticated(true);
        loadData();
      }
    }
  };

  const loadData = async () => {
    setLoading(true);
    const [s, b, t] = await Promise.all([
      getShipments(),
      getBookings(),
      getTestimonials()
    ]);
    setShipments(s);
    setBookings(b);
    setTestimonials(t);
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profile?.role === "admin") {
      setAuthenticated(true);
      loadData();
    } else {
      await supabase.auth.signOut();
      toast({ title: "Access Denied", description: "You do not have admin privileges.", variant: "destructive" });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthenticated(false);
  };

  // Shipment handlers
  const filtered = shipments.filter(s => {
    const matchSearch = s.trackingNumber.toLowerCase().includes(search.toLowerCase()) || s.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const openCreate = () => {
    setEditingShipment(null);
    setForm({ ...emptyForm, trackingNumber: generateTrackingNumber() });
    setDialogOpen(true);
  };

  const openEdit = (s: Shipment) => {
    setEditingShipment(s);
    setForm({
      trackingNumber: s.trackingNumber,
      customerName: s.customerName,
      origin: s.origin,
      destination: s.destination,
      status: s.status,
      timeline: s.timeline,
      packageDescription: s.packageDescription || "",
      packageType: s.packageType || "",
      packageSize: s.packageSize || ""
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.customerName || !form.origin || !form.destination) {
      toast({ title: "Missing fields", variant: "destructive" });
      return;
    }
    
    if (editingShipment) {
      const success = await updateShipment(editingShipment.id, form);
      if (success) {
        toast({ title: "Shipment updated" });
        loadData();
      }
    } else {
      const result = await createShipment(form);
      if (result) {
        toast({ title: "Shipment created", description: form.trackingNumber });
        loadData();
      }
    }
    setDialogOpen(false);
  };

  const updateShipmentStatusHandler = async (id: string, status: ShipmentStatus) => {
    const success = await updateShipment(id, { status });
    if (success) {
      toast({ title: "Status updated", description: `Changed to ${status}` });
      loadData();
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const success = await deleteShipment(deleteId);
    if (success) {
      toast({ title: "Shipment deleted" });
      loadData();
    }
    setDeleteDialogOpen(false);
  };

  // Booking handlers
  const updateBookingStatusHandler = async (id: string, status: BookingRequest["status"]) => {
    const success = await updateBookingStatus(id, status);
    if (success) {
      toast({ title: "Booking status updated" });
      loadData();
    }
  };

  // Testimonial handlers
  const handleAddTestimonialHandler = async () => {
    if (!tForm.name || !tForm.message) return;
    const success = await addTestimonial(tForm);
    if (success) {
      toast({ title: "Testimonial added" });
      loadData();
      setTForm({ name: "", message: "", rating: 5 });
      setTDialogOpen(false);
    }
  };

  const deleteTestimonialHandler = async (id: string) => {
    const success = await deleteTestimonial(id);
    if (success) {
      toast({ title: "Testimonial deleted" });
      loadData();
    }
  };

  const getStatusBadge = (status: ShipmentStatus) => {
    const colors: Record<ShipmentStatus, string> = {
      Pending: "bg-muted text-muted-foreground",
      Processing: "bg-blue-100 text-blue-700",
      "Picked Up": "bg-indigo-100 text-indigo-700",
      "In Transit": "bg-primary text-white",
      "Out for Delivery": "bg-accent text-white",
      Delivered: "bg-green-500 text-white",
    };
    return <Badge className={colors[status]}>{status}</Badge>;
  };

  const stats = [
    { label: "Total Shipments", value: shipments.length, icon: Package2, change: "+12%", up: true },
    { label: "In Transit", value: shipments.filter(s => s.status === "In Transit").length, icon: Truck, change: "+5%", up: true },
    { label: "Delivered", value: shipments.filter(s => s.status === "Delivered").length, icon: CheckCircle, change: "+18%", up: true },
    { label: "New Bookings", value: bookings.filter(b => b.status === "New").length, icon: AlertTriangle, change: "action needed", up: false },
  ];

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30">
        <Card className="w-full max-w-md border-0 shadow-xl rounded-2xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-primary">Admin Access</h1>
              <p className="text-muted-foreground mt-2">Enter admin password to continue</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@cargocept.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleLogin()}
                    placeholder="Enter password"
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            <Button onClick={handleLogin} variant="logistics" className="w-full" disabled={loading}>
              {loading ? "Authenticating..." : "Access Dashboard"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-gradient-to-r from-primary to-accent text-white py-10">
        <div className="container-logistics flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-white/80">Manage shipments, bookings, and testimonials</p>
          </div>
          <Button variant="outline" className="text-white border-white hover:bg-white/10" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </section>

      <div className="container-logistics py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(stat => (
            <Card key={stat.label} className="border-0 shadow-md rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <span className={`text-xs font-medium flex items-center gap-1 ${stat.up ? "text-green-600" : "text-accent"}`}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="shipments">
          <TabsList className="mb-4">
            <TabsTrigger value="shipments" className="gap-2"><Package2 className="w-4 h-4" />Shipments</TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2"><Inbox className="w-4 h-4" />Bookings</TabsTrigger>
            <TabsTrigger value="testimonials" className="gap-2"><MessageSquare className="w-4 h-4" />Testimonials</TabsTrigger>
          </TabsList>

          {/* SHIPMENTS */}
          <TabsContent value="shipments" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search tracking # or customer..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filter" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button variant="logistics" onClick={openCreate} className="gap-2"><Plus className="w-4 h-4" />New Shipment</Button>
            </div>

            <Card className="border-0 shadow-md rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Tracking #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No shipments found</TableCell></TableRow>
                    ) : filtered.map(s => (
                      <TableRow key={s.id}>
                        <TableCell className="font-mono font-semibold text-primary">{s.trackingNumber}</TableCell>
                        <TableCell>{s.customerName}</TableCell>
                        <TableCell className="text-sm">{s.origin}</TableCell>
                        <TableCell className="text-sm">{s.destination}</TableCell>
                        <TableCell>
                          <Select value={s.status} onValueChange={v => updateShipmentStatusHandler(s.id, v as ShipmentStatus)}>
                            <SelectTrigger className="w-[160px] h-8 border-0 p-0 shadow-none">{getStatusBadge(s.status)}</SelectTrigger>
                            <SelectContent>{statusOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(s)}><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => { setDeleteId(s.id); setDeleteDialogOpen(true); }}><Trash2 className="w-4 h-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* BOOKINGS */}
          <TabsContent value="bookings" className="space-y-4">
            <Card className="border-0 shadow-md rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Pickup</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.length === 0 ? (
                      <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No booking requests yet</TableCell></TableRow>
                    ) : bookings.map(b => (
                      <TableRow key={b.id}>
                        <TableCell className="font-medium">{b.fullName}</TableCell>
                        <TableCell className="text-sm">{b.email}</TableCell>
                        <TableCell className="text-sm">{b.phone}</TableCell>
                        <TableCell className="text-sm">{b.pickupLocation}</TableCell>
                        <TableCell className="text-sm">{b.destination}</TableCell>
                        <TableCell className="text-sm">{b.createdAt}</TableCell>
                        <TableCell>
                          <Select value={b.status} onValueChange={v => updateBookingStatusHandler(b.id, v as BookingRequest["status"])}>
                            <SelectTrigger className="w-[130px] h-8 border-0 p-0 shadow-none">
                              <Badge className={b.status === "New" ? "bg-red-100 text-red-700" : b.status === "Contacted" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}>{b.status}</Badge>
                            </SelectTrigger>
                            <SelectContent>{bookingStatusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* TESTIMONIALS */}
          <TabsContent value="testimonials" className="space-y-4">
            <div className="flex justify-end">
              <Button variant="logistics" onClick={() => setTDialogOpen(true)} className="gap-2"><Plus className="w-4 h-4" />Add Testimonial</Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map(t => (
                <Card key={t.id} className="border-0 shadow-md rounded-2xl">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{t.name}</p>
                        <div className="flex gap-0.5 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={`text-sm ${i < t.rating ? "text-accent" : "text-muted"}`}>★</span>
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteTestimonialHandler(t.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">"{t.message}"</p>
                    <p className="text-xs text-muted-foreground">{t.createdAt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Shipment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingShipment ? "Edit Shipment" : "Create Shipment"}</DialogTitle>
            <DialogDescription>{editingShipment ? "Update details below." : "Fill in shipment details."}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2 col-span-2">
              <Label>Tracking Number</Label>
              <Input value={form.trackingNumber} readOnly className="bg-muted font-mono" />
            </div>
            <div className="space-y-2">
              <Label>Customer Name *</Label>
              <Input value={form.customerName} onChange={e => setForm(p => ({ ...p, customerName: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v as ShipmentStatus }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Origin *</Label>
              <Input value={form.origin} onChange={e => setForm(p => ({ ...p, origin: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Destination *</Label>
              <Input value={form.destination} onChange={e => setForm(p => ({ ...p, destination: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Package Type</Label>
              <Input placeholder="e.g. Box, Pallet, Document" value={form.packageType} onChange={e => setForm(p => ({ ...p, packageType: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Package Size</Label>
              <Input placeholder="e.g. 20x20x20cm, 5kg" value={form.packageSize} onChange={e => setForm(p => ({ ...p, packageSize: e.target.value }))} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Package Description</Label>
              <Textarea placeholder="Describe the contents of the package..." value={form.packageDescription} onChange={e => setForm(p => ({ ...p, packageDescription: e.target.value }))} rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="logistics" onClick={handleSave}>{editingShipment ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Shipment</DialogTitle>
            <DialogDescription>Are you sure? This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Testimonial Dialog */}
      <Dialog open={tDialogOpen} onOpenChange={setTDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Testimonial</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input value={tForm.name} onChange={e => setTForm(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Message *</Label>
              <Textarea value={tForm.message} onChange={e => setTForm(p => ({ ...p, message: e.target.value }))} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Rating</Label>
              <Select value={String(tForm.rating)} onValueChange={v => setTForm(p => ({ ...p, rating: Number(v) }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{[5, 4, 3, 2, 1].map(r => <SelectItem key={r} value={String(r)}>{r} Stars</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTDialogOpen(false)}>Cancel</Button>
            <Button variant="logistics" onClick={handleAddTestimonialHandler}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
