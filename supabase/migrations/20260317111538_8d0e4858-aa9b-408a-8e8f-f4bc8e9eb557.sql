
-- Enum types
CREATE TYPE public.app_role AS ENUM ('admin', 'lab_manager', 'professor', 'lab_technician', 'lab_supervisor', 'student', 'auditor');
CREATE TYPE public.hazard_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.chemical_unit AS ENUM ('mL', 'L', 'g', 'kg', 'mol');
CREATE TYPE public.request_status AS ENUM ('pending', 'approved_level1', 'approved', 'rejected', 'dispensed');
CREATE TYPE public.equipment_status AS ENUM ('available', 'in_use', 'maintenance', 'out_of_order');
CREATE TYPE public.incident_severity AS ENUM ('minor', 'moderate', 'major', 'critical');
CREATE TYPE public.alert_type AS ENUM ('expiry', 'low_stock', 'hazard', 'maintenance', 'anomaly');

-- PROFILES TABLE
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  department TEXT DEFAULT 'General',
  hazard_clearance_level hazard_level DEFAULT 'low',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- USER ROLES TABLE
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- CHEMICALS TABLE
CREATE TABLE public.chemicals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  cas_number TEXT NOT NULL UNIQUE,
  formula TEXT NOT NULL,
  hazard_level hazard_level NOT NULL DEFAULT 'low',
  quantity NUMERIC NOT NULL DEFAULT 0,
  unit chemical_unit NOT NULL DEFAULT 'mL',
  minimum_stock NUMERIC NOT NULL DEFAULT 0,
  location TEXT NOT NULL,
  expiry_date DATE NOT NULL,
  supplier TEXT,
  msds_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chemicals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view chemicals" ON public.chemicals FOR SELECT TO authenticated USING (true);
CREATE POLICY "Technicians+ can insert chemicals" ON public.chemicals FOR INSERT TO authenticated WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'lab_manager') OR public.has_role(auth.uid(), 'lab_technician')
);
CREATE POLICY "Technicians+ can update chemicals" ON public.chemicals FOR UPDATE TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'lab_manager') OR public.has_role(auth.uid(), 'lab_technician')
);

-- CHEMICAL REQUESTS TABLE
CREATE TABLE public.chemical_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chemical_id UUID NOT NULL REFERENCES public.chemicals(id),
  requester_id UUID NOT NULL REFERENCES auth.users(id),
  quantity NUMERIC NOT NULL,
  unit chemical_unit NOT NULL DEFAULT 'mL',
  justification TEXT NOT NULL,
  experiment_ref TEXT,
  status request_status NOT NULL DEFAULT 'pending',
  hazard_level hazard_level NOT NULL DEFAULT 'low',
  reviewer_comment TEXT,
  reviewer_id UUID REFERENCES auth.users(id),
  second_reviewer_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chemical_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own requests" ON public.chemical_requests FOR SELECT TO authenticated USING (
  auth.uid() = requester_id OR public.has_role(auth.uid(), 'professor') OR public.has_role(auth.uid(), 'lab_manager') OR public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "Authenticated users can create requests" ON public.chemical_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Professors+ can update requests" ON public.chemical_requests FOR UPDATE TO authenticated USING (
  public.has_role(auth.uid(), 'professor') OR public.has_role(auth.uid(), 'lab_manager') OR public.has_role(auth.uid(), 'admin')
);

-- EXPERIMENTS TABLE
CREATE TABLE public.experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  student_id UUID NOT NULL REFERENCES auth.users(id),
  supervisor_id UUID REFERENCES auth.users(id),
  chemicals JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'confirmed')),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.experiments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view experiments" ON public.experiments FOR SELECT TO authenticated USING (
  auth.uid() = student_id OR auth.uid() = supervisor_id OR public.has_role(auth.uid(), 'lab_manager') OR public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "Students can create experiments" ON public.experiments FOR INSERT TO authenticated WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Users can update experiments" ON public.experiments FOR UPDATE TO authenticated USING (
  auth.uid() = student_id OR auth.uid() = supervisor_id OR public.has_role(auth.uid(), 'lab_manager')
);

-- EQUIPMENT TABLE
CREATE TABLE public.equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  model TEXT,
  status equipment_status NOT NULL DEFAULT 'available',
  location TEXT,
  last_calibration DATE,
  next_calibration DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view equipment" ON public.equipment FOR SELECT TO authenticated USING (true);
CREATE POLICY "Technicians+ can insert equipment" ON public.equipment FOR INSERT TO authenticated WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'lab_manager') OR public.has_role(auth.uid(), 'lab_technician')
);
CREATE POLICY "Technicians+ can update equipment" ON public.equipment FOR UPDATE TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'lab_manager') OR public.has_role(auth.uid(), 'lab_technician')
);

-- AUDIT LOG TABLE (immutable - no update/delete policies)
CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  user_name TEXT,
  action TEXT NOT NULL,
  module TEXT NOT NULL,
  details TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins and auditors can view audit log" ON public.audit_log FOR SELECT TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'auditor') OR public.has_role(auth.uid(), 'lab_manager')
);
CREATE POLICY "Authenticated users can insert audit entries" ON public.audit_log FOR INSERT TO authenticated WITH CHECK (true);

-- ALERTS TABLE
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type alert_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  is_read BOOLEAN DEFAULT false,
  related_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view alerts" ON public.alerts FOR SELECT TO authenticated USING (true);
CREATE POLICY "System can insert alerts" ON public.alerts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can mark alerts as read" ON public.alerts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- TRIGGERS for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_chemicals_updated_at BEFORE UPDATE ON public.chemicals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_chemical_requests_updated_at BEFORE UPDATE ON public.chemical_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_experiments_updated_at BEFORE UPDATE ON public.experiments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_equipment_updated_at BEFORE UPDATE ON public.equipment FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- AUTO-CREATE PROFILE ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), NEW.email);
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'student');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
