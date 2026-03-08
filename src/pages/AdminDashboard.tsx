import { useState } from "react";
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
  Package2, Truck, MapPin, Clock, Search, Plus, Edit, Trash2,
  BarChart3, TrendingUp, Users, CheckCircle, AlertTriangle,
  ArrowUpRight, ArrowDownRight, RefreshCw
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";

type ShipmentStatus = "Pending" | "Picked Up" | "In Transit" | "Out for Delivery" | "Delivered" | "Cancelled";

interface Shipment {
  id: string;
  trackingNumber: string;
  senderName: string;
  senderAddress: string;
  recipientName: string;
  recipientAddress: string;
  weight: string;
  serviceType: string;
  status: ShipmentStatus;
  currentLocation: string;
  createdAt: string;
  estimatedDelivery: string;
  notes: string;
}

const initialShipments: Shipment[] = [
  { id: "1", trackingNumber: "CG001287463", senderName: "John Smith", senderAddress: "London, UK", recipientName: "Sarah Johnson", recipientAddress: "Manchester, UK", weight: "5.2", serviceType: "Express", status: "In Transit", currentLocation: "Birmingham, UK", createdAt: "2025-02-25", estimatedDelivery: "2025-02-28", notes: "Fragile items" },
  { id: "2", trackingNumber: "CG001287464", senderName: "Acme Corp", senderAddress: "Bristol, UK", recipientName: "David Lee", recipientAddress: "Edinburgh, UK", weight: "12.0", serviceType: "Standard", status: "Pending", currentLocation: "Bristol, UK", createdAt: "2025-02-27", estimatedDelivery: "2025-03-03", notes: "" },
  { id: "3", trackingNumber: "CG001287465", senderName: "TechFlow Ltd", senderAddress: "Leeds, UK", recipientName: "Emma Wilson", recipientAddress: "Cardiff, UK", weight: "2.8", serviceType: "Same-day", status: "Out for Delivery", currentLocation: "Cardiff, UK", createdAt: "2025-02-28", estimatedDelivery: "2025-02-28", notes: "Leave with neighbour" },
  { id: "4", trackingNumber: "CG001287466", senderName: "Global Imports", senderAddress: "Liverpool, UK", recipientName: "James Brown", recipientAddress: "Glasgow, UK", weight: "8.5", serviceType: "Express", status: "Delivered", currentLocation: "Glasgow, UK", createdAt: "2025-02-20", estimatedDelivery: "2025-02-22", notes: "" },
  { id: "5", trackingNumber: "CG001287467", senderName: "Fresh Foods Co", senderAddress: "Oxford, UK", recipientName: "Maria Garcia", recipientAddress: "Cambridge, UK", weight: "15.0", serviceType: "Standard", status: "Picked Up", currentLocation: "Oxford, UK", createdAt: "2025-02-27", estimatedDelivery: "2025-03-01", notes: "Temperature sensitive" },
  { id: "6", trackingNumber: "CG001287468", senderName: "Quick Parts", senderAddress: "Nottingham, UK", recipientName: "Robert Taylor", recipientAddress: "Sheffield, UK", weight: "1.2", serviceType: "Same-day", status: "Cancelled", currentLocation: "Nottingham, UK", createdAt: "2025-02-26", estimatedDelivery: "2025-02-26", notes: "Customer requested cancellation" },
];

const monthlyData = [
  { month: "Sep", shipments: 1240, delivered: 1180, revenue: 48200 },
  { month: "Oct", shipments: 1380, delivered: 1320, revenue: 52100 },
  { month: "Nov", shipments: 1520, delivered: 1460, revenue: 58900 },
  { month: "Dec", shipments: 1890, delivered: 1790, revenue: 72300 },
  { month: "Jan", shipments: 1650, delivered: 1590, revenue: 63400 },
  { month: "Feb", shipments: 1720, delivered: 1650, revenue: 67800 },
];

const statusDistribution = [
  { name: "Delivered", value: 45, color: "hsl(142, 71%, 45%)" },
  { name: "In Transit", value: 25, color: "hsl(221, 84%, 35%)" },
  { name: "Pending", value: 15, color: "hsl(24, 95%, 53%)" },
  { name: "Out for Delivery", value: 10, color: "hsl(262, 83%, 58%)" },
  { name: "Cancelled", value: 5, color: "hsl(0, 84%, 50%)" },
];

const emptyShipment: Omit<Shipment, "id"> = {
  trackingNumber: "",
  senderName: "",
  senderAddress: "",
  recipientName: "",
  recipientAddress: "",
  weight: "",
  serviceType: "Standard",
  status: "Pending",
  currentLocation: "",
  createdAt: new Date().toISOString().split("T")[0],
  estimatedDelivery: "",
  notes: "",
};

const statusOptions: ShipmentStatus[] = ["Pending", "Picked Up", "In Transit", "Out for Delivery", "Delivered", "Cancelled"];

const AdminDashboard = () => {
  const { toast } = useToast();
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);
  const [formData, setFormData] = useState(emptyShipment);
  const [shipmentToDelete, setShipmentToDelete] = useState<string | null>(null);

  const generateTrackingNumber = () => `CG${String(Date.now()).slice(-9)}`;

  const filtered = shipments.filter((s) => {
    const matchesSearch =
      s.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.senderName.toLowerCase().includes(search.toLowerCase()) ||
      s.recipientName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openCreate = () => {
    setEditingShipment(null);
    setFormData({ ...emptyShipment, trackingNumber: generateTrackingNumber() });
    setDialogOpen(true);
  };

  const openEdit = (shipment: Shipment) => {
    setEditingShipment(shipment);
    setFormData({ ...shipment });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.trackingNumber || !formData.senderName || !formData.recipientName) {
      toast({ title: "Missing fields", description: "Please fill in required fields.", variant: "destructive" });
      return;
    }
    if (editingShipment) {
      setShipments((prev) => prev.map((s) => (s.id === editingShipment.id ? { ...formData, id: s.id } as Shipment : s)));
      toast({ title: "Shipment updated", description: `${formData.trackingNumber} has been updated.` });
    } else {
      const newShipment: Shipment = { ...formData, id: String(Date.now()) } as Shipment;
      setShipments((prev) => [newShipment, ...prev]);
      toast({ title: "Shipment created", description: `${formData.trackingNumber} has been created.` });
    }
    setDialogOpen(false);
  };

  const confirmDelete = (id: string) => {
    setShipmentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (shipmentToDelete) {
      setShipments((prev) => prev.filter((s) => s.id !== shipmentToDelete));
      toast({ title: "Shipment deleted", description: "The shipment has been removed." });
    }
    setDeleteDialogOpen(false);
    setShipmentToDelete(null);
  };

  const updateStatus = (id: string, status: ShipmentStatus) => {
    setShipments((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    toast({ title: "Status updated", description: `Shipment status changed to ${status}.` });
  };

  const getStatusBadge = (status: ShipmentStatus) => {
    const colors: Record<ShipmentStatus, string> = {
      Pending: "bg-muted text-muted-foreground",
      "Picked Up": "bg-[hsl(var(--logistics-blue-light))] text-[hsl(var(--logistics-blue-dark))]",
      "In Transit": "bg-[hsl(var(--logistics-blue))] text-white",
      "Out for Delivery": "bg-[hsl(var(--delivery-orange))] text-white",
      Delivered: "bg-green-500 text-white",
      Cancelled: "bg-destructive text-destructive-foreground",
    };
    return <Badge className={colors[status]}>{status}</Badge>;
  };

  const stats = [
    { label: "Total Shipments", value: shipments.length, icon: Package2, change: "+12%", up: true },
    { label: "In Transit", value: shipments.filter((s) => s.status === "In Transit").length, icon: Truck, change: "+5%", up: true },
    { label: "Delivered", value: shipments.filter((s) => s.status === "Delivered").length, icon: CheckCircle, change: "+18%", up: true },
    { label: "Pending", value: shipments.filter((s) => s.status === "Pending").length, icon: AlertTriangle, change: "-3%", up: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="logistics-gradient text-primary-foreground py-12">
        <div className="container-logistics">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-primary-foreground/80">Manage shipments, track cargo, and view analytics</p>
        </div>
      </section>

      <div className="container-logistics py-8 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-0 shadow-md">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-5 h-5 text-[hsl(var(--logistics-blue))]" />
                  <span className={`text-xs font-medium flex items-center gap-1 ${stat.up ? "text-green-600" : "text-destructive"}`}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
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
            <TabsTrigger value="shipments" className="gap-2"><Package2 className="w-4 h-4" /> Shipments</TabsTrigger>
            <TabsTrigger value="live" className="gap-2"><Truck className="w-4 h-4" /> Live Tracking</TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2"><BarChart3 className="w-4 h-4" /> Analytics</TabsTrigger>
          </TabsList>

          {/* SHIPMENTS TAB */}
          <TabsContent value="shipments" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by tracking #, sender, or recipient..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filter status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statusOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button variant="logistics" onClick={openCreate} className="gap-2"><Plus className="w-4 h-4" /> New Shipment</Button>
            </div>

            <Card className="border-0 shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Tracking #</TableHead>
                      <TableHead>Sender</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>ETA</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No shipments found</TableCell></TableRow>
                    ) : (
                      filtered.map((s) => (
                        <TableRow key={s.id} className="group">
                          <TableCell className="font-mono font-semibold text-[hsl(var(--logistics-blue))]">{s.trackingNumber}</TableCell>
                          <TableCell>{s.senderName}</TableCell>
                          <TableCell>{s.recipientName}</TableCell>
                          <TableCell><Badge variant="outline">{s.serviceType}</Badge></TableCell>
                          <TableCell>
                            <Select value={s.status} onValueChange={(v) => updateStatus(s.id, v as ShipmentStatus)}>
                              <SelectTrigger className="w-[150px] h-8 border-0 p-0 shadow-none focus:ring-0">{getStatusBadge(s.status)}</SelectTrigger>
                              <SelectContent>
                                {statusOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="flex items-center gap-1 text-sm"><MapPin className="w-3 h-3 text-muted-foreground" />{s.currentLocation}</TableCell>
                          <TableCell className="text-sm">{s.estimatedDelivery}</TableCell>
                          <TableCell className="text-right space-x-1">
                            <Button variant="ghost" size="icon" onClick={() => openEdit(s)}><Edit className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => confirmDelete(s.id)}><Trash2 className="w-4 h-4" /></Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* LIVE TRACKING TAB */}
          <TabsContent value="live" className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                      Live Shipment Monitoring
                    </CardTitle>
                    <CardDescription>Full visibility — update status, location, and ETA in real-time</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => toast({ title: "Refreshed", description: "Live data synced." })}><RefreshCw className="w-4 h-4" /> Sync</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Tracking #</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Current Location</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>ETA</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {shipments.filter(s => s.status !== "Cancelled" && s.status !== "Delivered").map((s) => (
                        <TableRow key={s.id} className="group">
                          <TableCell className="font-mono font-semibold text-[hsl(var(--logistics-blue))]">{s.trackingNumber}</TableCell>
                          <TableCell className="text-sm">
                            <div className="flex flex-col">
                              <span className="font-medium">{s.senderAddress}</span>
                              <span className="text-muted-foreground">→ {s.recipientAddress}</span>
                            </div>
                          </TableCell>
                          <TableCell><Badge variant="outline">{s.serviceType}</Badge></TableCell>
                          <TableCell>
                            <Select value={s.status} onValueChange={(v) => updateStatus(s.id, v as ShipmentStatus)}>
                              <SelectTrigger className="w-[150px] h-8 border-0 p-0 shadow-none focus:ring-0">{getStatusBadge(s.status)}</SelectTrigger>
                              <SelectContent>
                                {statusOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-sm flex items-center gap-1"><MapPin className="w-3 h-3 text-muted-foreground" />{s.currentLocation}</TableCell>
                          <TableCell>
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div className="bg-gradient-to-r from-[hsl(var(--logistics-blue))] to-[hsl(var(--delivery-orange))] h-2 rounded-full" style={{ width: `${s.status === "Pending" ? 5 : s.status === "Picked Up" ? 20 : s.status === "In Transit" ? 60 : s.status === "Out for Delivery" ? 90 : 100}%` }} />
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{s.estimatedDelivery}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => openEdit(s)}><Edit className="w-4 h-4" /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardHeader><CardTitle className="text-lg">Monthly Shipments</CardTitle><CardDescription>Shipments vs Delivered over 6 months</CardDescription></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 9%, 85%)" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="shipments" fill="hsl(221, 84%, 35%)" radius={[4, 4, 0, 0]} name="Total" />
                      <Bar dataKey="delivered" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} name="Delivered" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader><CardTitle className="text-lg">Status Distribution</CardTitle><CardDescription>Current shipment statuses</CardDescription></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {statusDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md lg:col-span-2">
                <CardHeader><CardTitle className="text-lg">Revenue Trend (£)</CardTitle><CardDescription>Monthly revenue over 6 months</CardDescription></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 9%, 85%)" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip formatter={(value: number) => `£${value.toLocaleString()}`} />
                      <Line type="monotone" dataKey="revenue" stroke="hsl(24, 95%, 53%)" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingShipment ? "Edit Shipment" : "Create New Shipment"}</DialogTitle>
            <DialogDescription>{editingShipment ? "Update shipment details below." : "Fill in the details to create a new shipment."}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Tracking Number</Label>
              <Input value={formData.trackingNumber} readOnly className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Service Type</Label>
              <Select value={formData.serviceType} onValueChange={(v) => setFormData((p) => ({ ...p, serviceType: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Express">Express</SelectItem>
                  <SelectItem value="Same-day">Same-day</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Sender Name *</Label>
              <Input value={formData.senderName} onChange={(e) => setFormData((p) => ({ ...p, senderName: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Sender Address</Label>
              <Input value={formData.senderAddress} onChange={(e) => setFormData((p) => ({ ...p, senderAddress: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Recipient Name *</Label>
              <Input value={formData.recipientName} onChange={(e) => setFormData((p) => ({ ...p, recipientName: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Recipient Address</Label>
              <Input value={formData.recipientAddress} onChange={(e) => setFormData((p) => ({ ...p, recipientAddress: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input type="number" value={formData.weight} onChange={(e) => setFormData((p) => ({ ...p, weight: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData((p) => ({ ...p, status: v as ShipmentStatus }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {statusOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Current Location</Label>
              <Input value={formData.currentLocation} onChange={(e) => setFormData((p) => ({ ...p, currentLocation: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Estimated Delivery</Label>
              <Input type="date" value={formData.estimatedDelivery} onChange={(e) => setFormData((p) => ({ ...p, estimatedDelivery: e.target.value }))} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Notes</Label>
              <Textarea value={formData.notes} onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))} rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="logistics" onClick={handleSave}>{editingShipment ? "Update" : "Create"} Shipment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Shipment</DialogTitle>
            <DialogDescription>Are you sure you want to delete this shipment? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
