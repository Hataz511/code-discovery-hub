
-- Chemical locations: supports same chemical in multiple labs with individual quantities
CREATE TABLE public.chemical_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chemical_id uuid NOT NULL REFERENCES public.chemicals(id) ON DELETE CASCADE,
  lab_name text NOT NULL,
  quantity numeric NOT NULL DEFAULT 0,
  unit text NOT NULL DEFAULT 'mL',
  notes text,
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Lab sessions: lab assistant tracks student experiments and equipment
CREATE TABLE public.lab_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES auth.users(id),
  student_name text NOT NULL,
  experiment_title text NOT NULL,
  experiment_description text,
  lab_name text NOT NULL,
  chemicals_used jsonb DEFAULT '[]',
  equipment_used jsonb DEFAULT '[]',
  equipment_status text NOT NULL DEFAULT 'pending_check',
  equipment_notes text,
  supervisor_id uuid REFERENCES auth.users(id),
  supervisor_name text,
  status text NOT NULL DEFAULT 'scheduled',
  session_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.chemical_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_sessions ENABLE ROW LEVEL SECURITY;

-- Chemical locations policies
CREATE POLICY "Authenticated can view chemical locations"
  ON public.chemical_locations FOR SELECT TO authenticated USING (true);

CREATE POLICY "Inventory staff can manage chemical locations"
  ON public.chemical_locations FOR INSERT TO authenticated
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'lab_manager'::app_role) OR
    has_role(auth.uid(), 'lab_technician'::app_role)
  );

CREATE POLICY "Inventory staff can update chemical locations"
  ON public.chemical_locations FOR UPDATE TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'lab_manager'::app_role) OR
    has_role(auth.uid(), 'lab_technician'::app_role)
  );

CREATE POLICY "Inventory staff can delete chemical locations"
  ON public.chemical_locations FOR DELETE TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'lab_manager'::app_role)
  );

-- Lab sessions policies
CREATE POLICY "Authenticated can view lab sessions"
  ON public.lab_sessions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Staff can manage lab sessions"
  ON public.lab_sessions FOR INSERT TO authenticated
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'lab_manager'::app_role) OR
    has_role(auth.uid(), 'lab_supervisor'::app_role) OR
    has_role(auth.uid(), 'lab_technician'::app_role)
  );

CREATE POLICY "Staff can update lab sessions"
  ON public.lab_sessions FOR UPDATE TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'lab_manager'::app_role) OR
    has_role(auth.uid(), 'lab_supervisor'::app_role) OR
    has_role(auth.uid(), 'lab_technician'::app_role)
  );

CREATE POLICY "Staff can delete lab sessions"
  ON public.lab_sessions FOR DELETE TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'lab_manager'::app_role)
  );

-- Triggers for updated_at
CREATE TRIGGER update_chemical_locations_updated_at
  BEFORE UPDATE ON public.chemical_locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lab_sessions_updated_at
  BEFORE UPDATE ON public.lab_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
