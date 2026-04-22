import { supabase } from "./supabase";

export type ShipmentStatus = "Pending" | "Processing" | "Picked Up" | "In Transit" | "Out for Delivery" | "Delivered";

export interface Shipment {
  id: string;
  trackingNumber: string;
  customerName: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  packageDescription?: string;
  packageType?: string;
  packageSize?: string;
  createdAt: string;
  updatedAt: string;
  timeline: { status: string; date: string; location: string }[];
}

export interface BookingRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  destination: string;
  packageDetails: string;
  notes: string;
  status: "New" | "Contacted" | "In Progress";
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  message: string;
  rating: number;
  createdAt: string;
}

// Shipments
export async function getShipments(): Promise<Shipment[]> {
  const { data, error } = await supabase
    .from("shipments")
    .select(`
      *,
      timeline:shipment_timeline(status, date, location)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching shipments:", error);
    return [];
  }

  return (data || []).map(s => ({
    id: s.id,
    trackingNumber: s.tracking_number,
    customerName: s.customer_name,
    origin: s.origin,
    destination: s.destination,
    status: s.status as ShipmentStatus,
    packageDescription: s.package_description,
    packageType: s.package_type,
    packageSize: s.package_size,
    createdAt: s.created_at,
    updatedAt: s.updated_at,
    timeline: s.timeline || []
  }));
}

export async function getShipmentByTracking(trackingNumber: string): Promise<Shipment | undefined> {
  const { data, error } = await supabase
    .from("shipments")
    .select(`
      *,
      timeline:shipment_timeline(status, date, location)
    `)
    .eq("tracking_number", trackingNumber)
    .single();

  if (error) {
    console.error("Error fetching shipment by tracking:", error);
    return undefined;
  }

  return {
    id: data.id,
    trackingNumber: data.tracking_number,
    customerName: data.customer_name,
    origin: data.origin,
    destination: data.destination,
    status: data.status as ShipmentStatus,
    packageDescription: data.package_description,
    packageType: data.package_type,
    packageSize: data.package_size,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    timeline: data.timeline || []
  };
}

export function generateTrackingNumber(): string {
  return `CG${String(Date.now()).slice(-9)}`;
}

export async function createShipment(s: Omit<Shipment, "id" | "createdAt" | "updatedAt" | "timeline">): Promise<Shipment | null> {
  const { data: shipment, error: sError } = await supabase
    .from("shipments")
    .insert({
      tracking_number: s.trackingNumber,
      customer_name: s.customerName,
      origin: s.origin,
      destination: s.destination,
      status: s.status,
      package_description: s.packageDescription,
      package_type: s.packageType,
      package_size: s.packageSize
    })
    .select()
    .single();

  if (sError) {
    console.error("Error creating shipment:", sError);
    return null;
  }

  // Add initial timeline entry
  const { error: tError } = await supabase
    .from("shipment_timeline")
    .insert({
      shipment_id: shipment.id,
      status: s.status,
      location: s.origin
    });

  if (tError) {
    console.error("Error creating initial timeline entry:", tError);
  }

  return getShipmentByTracking(s.trackingNumber);
}

export async function updateShipment(id: string, s: Partial<Shipment>): Promise<boolean> {
  const updateData: any = {};
  if (s.customerName) updateData.customer_name = s.customerName;
  if (s.origin) updateData.origin = s.origin;
  if (s.destination) updateData.destination = s.destination;
  if (s.status) updateData.status = s.status;
  if (s.packageDescription !== undefined) updateData.package_description = s.packageDescription;
  if (s.packageType !== undefined) updateData.package_type = s.packageType;
  if (s.packageSize !== undefined) updateData.package_size = s.packageSize;

  const { error } = await supabase
    .from("shipments")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating shipment:", error);
    return false;
  }

  // If status changed, add to timeline
  if (s.status) {
    const { error: tError } = await supabase
      .from("shipment_timeline")
      .insert({
        shipment_id: id,
        status: s.status,
        location: s.destination || "" // Using destination as location for status updates
      });
    if (tError) console.error("Error adding timeline entry:", tError);
  }

  return true;
}

export async function deleteShipment(id: string): Promise<boolean> {
  const { error } = await supabase.from("shipments").delete().eq("id", id);
  if (error) {
    console.error("Error deleting shipment:", error);
    return false;
  }
  return true;
}

// Bookings
export async function getBookings(): Promise<BookingRequest[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }

  return (data || []).map(b => ({
    id: b.id,
    fullName: b.full_name,
    email: b.email,
    phone: b.phone,
    pickupLocation: b.pickup_location,
    destination: b.destination,
    packageDetails: b.package_details,
    notes: b.notes,
    status: b.status as any,
    createdAt: b.created_at
  }));
}

export async function addBooking(b: Omit<BookingRequest, "id" | "status" | "createdAt">): Promise<boolean> {
  const { error } = await supabase.from("bookings").insert({
    full_name: b.fullName,
    email: b.email,
    phone: b.phone,
    pickup_location: b.pickupLocation,
    destination: b.destination,
    package_details: b.packageDetails,
    notes: b.notes
  });

  if (error) {
    console.error("Error adding booking:", error);
    return false;
  }
  return true;
}

export async function updateBookingStatus(id: string, status: BookingRequest["status"]): Promise<boolean> {
  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) {
    console.error("Error updating booking status:", error);
    return false;
  }
  return true;
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }

  return (data || []).map(t => ({
    id: t.id,
    name: t.name,
    message: t.message,
    rating: t.rating,
    createdAt: t.created_at
  }));
}

export async function addTestimonial(t: Omit<Testimonial, "id" | "createdAt">): Promise<boolean> {
  const { error } = await supabase.from("testimonials").insert({
    name: t.name,
    message: t.message,
    rating: t.rating
  });

  if (error) {
    console.error("Error adding testimonial:", error);
    return false;
  }
  return true;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) {
    console.error("Error deleting testimonial:", error);
    return false;
  }
  return true;
}
