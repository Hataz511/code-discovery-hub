import { useState } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import LoginPage from "@/pages/Login";
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
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      </TooltipProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/requests" element={<RequestsPage />} />
              <Route path="/experiments" element={<ExperimentsPage />} />
              <Route path="/equipment" element={<EquipmentPage />} />
              <Route path="/incidents" element={<IncidentsPage />} />
              <Route path="/waste" element={<WastePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/audit" element={<AuditLogPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
