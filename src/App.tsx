
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { setupAdmin } from "@/utils/adminSetup";

// Pages
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import MyTickets from "./pages/MyTickets";
import Admin from "./pages/Admin";
import UserAccount from "./pages/UserAccount";
import AccessDenied from "./pages/AccessDenied";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLandingPage from "./pages/AdminLandingPage";
import PurchaseConfirmation from "./pages/PurchaseConfirmation";
import QRCodeValidator from "./pages/QRCodeValidator";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Call the setupAdmin function when the app is loaded
    setupAdmin();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <MotionConfig reducedMotion="user">
            <AuthProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/eventos" element={<Home />} />
                <Route path="/eventos/:id" element={<EventDetail />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/access-denied" element={<AccessDenied />} />
                <Route path="/politica-privacidade" element={<Home />} />
                <Route path="/termos-uso" element={<Home />} />
                <Route path="/sobre" element={<Home />} />
                
                {/* User protected routes */}
                <Route path="/meus-ingressos" element={
                  <ProtectedRoute>
                    <MyTickets />
                  </ProtectedRoute>
                } />
                <Route path="/minha-conta" element={
                  <ProtectedRoute requireUser>
                    <UserAccount />
                  </ProtectedRoute>
                } />
                <Route path="/minha-conta/email" element={
                  <ProtectedRoute requireUser>
                    <UserAccount />
                  </ProtectedRoute>
                } />
                <Route path="/minha-conta/senha" element={
                  <ProtectedRoute requireUser>
                    <UserAccount />
                  </ProtectedRoute>
                } />
                <Route path="/purchase-confirmation" element={
                  <ProtectedRoute>
                    <PurchaseConfirmation />
                  </ProtectedRoute>
                } />
                
                {/* Admin protected routes */}
                <Route path="/admin" element={
                  <ProtectedRoute requireAdmin>
                    <Admin />
                  </ProtectedRoute>
                } />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin-landing" element={
                  <ProtectedRoute requireAdmin>
                    <AdminLandingPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/qr-validator" element={
                  <ProtectedRoute requireAdmin>
                    <QRCodeValidator />
                  </ProtectedRoute>
                } />
                
                {/* Payment routes */}
                <Route path="/payment-success" element={<Home />} />
                <Route path="/payment-canceled" element={<Home />} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </AuthProvider>
          </MotionConfig>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
