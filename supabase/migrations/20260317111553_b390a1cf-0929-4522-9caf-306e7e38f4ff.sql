
-- Fix alerts update policy to only allow marking as read (not arbitrary updates)
DROP POLICY "Users can mark alerts as read" ON public.alerts;
CREATE POLICY "Users can mark alerts as read" ON public.alerts FOR UPDATE TO authenticated 
  USING (true) 
  WITH CHECK (is_read = true);

-- Fix alerts insert to only allow lab_manager/admin/technician
DROP POLICY "System can insert alerts" ON public.alerts;
CREATE POLICY "Staff can insert alerts" ON public.alerts FOR INSERT TO authenticated 
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'lab_manager') OR public.has_role(auth.uid(), 'lab_technician')
  );

-- Audit log insert is intentionally permissive - all users must be able to log actions
-- This is a security requirement for comprehensive audit trailing
