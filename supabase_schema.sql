-- Create tables
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE shipments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Processing', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered')),
  package_description TEXT,
  package_type TEXT,
  package_size TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE shipment_timeline (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID REFERENCES shipments(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  date TIMESTAMPTZ DEFAULT NOW(),
  location TEXT NOT NULL
);

CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  pickup_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  package_details TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Shipments Policies
CREATE POLICY "Shipments are viewable by everyone" ON shipments FOR SELECT USING (true);
CREATE POLICY "Admins can manage shipments" ON shipments FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Shipment Timeline Policies
CREATE POLICY "Timeline is viewable by everyone" ON shipment_timeline FOR SELECT USING (true);
CREATE POLICY "Admins can manage timeline" ON shipment_timeline FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Bookings Policies
CREATE POLICY "Everyone can create bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view bookings" ON bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update bookings" ON bookings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete bookings" ON bookings FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Testimonials Policies
CREATE POLICY "Testimonials are viewable by everyone" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Everyone can submit testimonials" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Functions & Triggers for updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_shipments_updated_at
BEFORE UPDATE ON shipments
FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Trigger for new user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
