// Shared localStorage-based store for shipments, bookings, and testimonials

export type ShipmentStatus = "Pending" | "Processing" | "Picked Up" | "In Transit" | "Out for Delivery" | "Delivered";

export interface Shipment {
  id: string;
  trackingNumber: string;
  customerName: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
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

const SHIPMENTS_KEY = "cargocept_shipments";
const BOOKINGS_KEY = "cargocept_bookings";
const TESTIMONIALS_KEY = "cargocept_testimonials";

// Default testimonials
const defaultTestimonials: Testimonial[] = [
  { id: "1", name: "Sarah Johnson", message: "Cargocept has revolutionized our shipping operations. Their real-time tracking and express delivery service helped us reduce delivery times by 40%.", rating: 5, createdAt: "2024-01-15" },
  { id: "2", name: "Michael Chen", message: "The international shipping service is outstanding. Customs clearance was seamless, and our packages arrived exactly when promised.", rating: 5, createdAt: "2024-02-20" },
  { id: "3", name: "Emily Rodriguez", message: "Same-day delivery has been a game-changer for our business. Customer satisfaction has increased dramatically since we started using Cargocept.", rating: 5, createdAt: "2024-03-10" },
  { id: "4", name: "David Wilson", message: "Their freight and bulk transport service handles our heavy machinery shipments with care. Professional, reliable, and cost-effective.", rating: 4, createdAt: "2024-04-05" },
];

const defaultShipments: Shipment[] = [
  {
    id: "1", trackingNumber: "CG001287463", customerName: "John Smith", origin: "London, UK", destination: "Manchester, UK",
    status: "In Transit", createdAt: "2025-02-25", updatedAt: "2025-02-27",
    timeline: [
      { status: "Pending", date: "2025-02-25 09:00", location: "London, UK" },
      { status: "Processing", date: "2025-02-25 14:00", location: "London Depot" },
      { status: "Picked Up", date: "2025-02-26 08:00", location: "London Hub" },
      { status: "In Transit", date: "2025-02-27 06:00", location: "Birmingham, UK" },
    ]
  },
  {
    id: "2", trackingNumber: "CG001287464", customerName: "Acme Corp", origin: "Bristol, UK", destination: "Edinburgh, UK",
    status: "Pending", createdAt: "2025-02-27", updatedAt: "2025-02-27",
    timeline: [
      { status: "Pending", date: "2025-02-27 10:00", location: "Bristol, UK" },
    ]
  },
  {
    id: "3", trackingNumber: "CG001287465", customerName: "TechFlow Ltd", origin: "Leeds, UK", destination: "Cardiff, UK",
    status: "Out for Delivery", createdAt: "2025-02-28", updatedAt: "2025-02-28",
    timeline: [
      { status: "Pending", date: "2025-02-28 07:00", location: "Leeds, UK" },
      { status: "Processing", date: "2025-02-28 08:00", location: "Leeds Depot" },
      { status: "Picked Up", date: "2025-02-28 09:00", location: "Leeds Hub" },
      { status: "In Transit", date: "2025-02-28 11:00", location: "M4 Corridor" },
      { status: "Out for Delivery", date: "2025-02-28 15:00", location: "Cardiff, UK" },
    ]
  },
  {
    id: "4", trackingNumber: "CG001287466", customerName: "Global Imports", origin: "Liverpool, UK", destination: "Glasgow, UK",
    status: "Delivered", createdAt: "2025-02-20", updatedAt: "2025-02-22",
    timeline: [
      { status: "Pending", date: "2025-02-20 09:00", location: "Liverpool, UK" },
      { status: "Processing", date: "2025-02-20 11:00", location: "Liverpool Depot" },
      { status: "Picked Up", date: "2025-02-20 14:00", location: "Liverpool Hub" },
      { status: "In Transit", date: "2025-02-21 06:00", location: "M6 Motorway" },
      { status: "Out for Delivery", date: "2025-02-22 08:00", location: "Glasgow, UK" },
      { status: "Delivered", date: "2025-02-22 11:00", location: "Glasgow, UK" },
    ]
  },
];

function getFromStorage<T>(key: string, defaults: T[]): T[] {
  try {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
  } catch {}
  return defaults;
}

function saveToStorage<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Shipments
export function getShipments(): Shipment[] { return getFromStorage(SHIPMENTS_KEY, defaultShipments); }
export function saveShipments(s: Shipment[]) { saveToStorage(SHIPMENTS_KEY, s); }
export function getShipmentByTracking(trackingNumber: string): Shipment | undefined {
  return getShipments().find(s => s.trackingNumber.toLowerCase() === trackingNumber.toLowerCase());
}
export function generateTrackingNumber(): string { return `CG${String(Date.now()).slice(-9)}`; }

// Bookings
export function getBookings(): BookingRequest[] { return getFromStorage(BOOKINGS_KEY, []); }
export function saveBookings(b: BookingRequest[]) { saveToStorage(BOOKINGS_KEY, b); }
export function addBooking(b: Omit<BookingRequest, "id" | "status" | "createdAt">): BookingRequest {
  const bookings = getBookings();
  const newBooking: BookingRequest = { ...b, id: String(Date.now()), status: "New", createdAt: new Date().toISOString().split("T")[0] };
  bookings.unshift(newBooking);
  saveBookings(bookings);
  return newBooking;
}

// Testimonials
export function getTestimonials(): Testimonial[] { return getFromStorage(TESTIMONIALS_KEY, defaultTestimonials); }
export function saveTestimonials(t: Testimonial[]) { saveToStorage(TESTIMONIALS_KEY, t); }
export function addTestimonial(t: Omit<Testimonial, "id" | "createdAt">): Testimonial {
  const testimonials = getTestimonials();
  const newT: Testimonial = { ...t, id: String(Date.now()), createdAt: new Date().toISOString().split("T")[0] };
  testimonials.unshift(newT);
  saveTestimonials(testimonials);
  return newT;
}
