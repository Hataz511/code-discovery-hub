import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import LoginPage from "@/pages/Login";
import ResetPasswordPage from "@/pages/ResetPassword";
import Dashboard from "@/pages/Dashboard";
import InventoryPage from "@/pages/Inventory";
import RequestsPage from "@/pages/Requests";
import ExperimentsPage from "@/pages/Experiments";
import EquipmentPage from "@/pages/Equipment";
import AuditLogPage from "@/pages/AuditLog";
import UsersPage from "@/pages/UsersPage";
import AnalyticsPage from "@/pages/Analytics";
import IncidentsPage from "@/pages/Incidents";
import WastePage from "@/pages/Waste";
import SchedulePage from "@/pages/Schedule";
import LabSessionsPage from "@/pages/LabSessions";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { session, loading } = useAuth();
  const [isRecovery, setIsRecovery] = useState(() => {
    return window.location.hash.includes('type=recovery') || window.location.pathname === '/reset-password';
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecovery(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show reset password page for recovery flow, even if session exists
  if (isRecovery) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ResetPasswordPage onComplete={() => setIsRecovery(false)} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  if (!session) {
    return <LoginPage />;
  }

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/experiments" element={<ExperimentsPage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/lab-sessions" element={<LabSessionsPage />} />
          <Route path="/incidents" element={<IncidentsPage />} />
          <Route path="/waste" element={<WastePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/audit" element={<AuditLogPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
