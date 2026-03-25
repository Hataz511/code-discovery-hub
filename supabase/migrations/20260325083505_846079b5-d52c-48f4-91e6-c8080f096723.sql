
CREATE TABLE public.schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  type text NOT NULL DEFAULT 'ligjëratë',
  day text NOT NULL,
  start_time text NOT NULL,
  end_time text NOT NULL,
  professor text NOT NULL,
  room text NOT NULL,
  program text NOT NULL,
  level text NOT NULL DEFAULT 'bachelor',
  year integer NOT NULL DEFAULT 1,
  semester integer NOT NULL DEFAULT 1,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view schedules"
  ON public.schedules FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can insert schedules"
  ON public.schedules FOR INSERT
  TO authenticated
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'lab_manager'::app_role) OR 
    has_role(auth.uid(), 'professor'::app_role)
  );

CREATE POLICY "Staff can update schedules"
  ON public.schedules FOR UPDATE
  TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'lab_manager'::app_role) OR 
    has_role(auth.uid(), 'professor'::app_role)
  );

CREATE POLICY "Staff can delete schedules"
  ON public.schedules FOR DELETE
  TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'lab_manager'::app_role)
  );

CREATE TRIGGER update_schedules_updated_at
  BEFORE UPDATE ON public.schedules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
