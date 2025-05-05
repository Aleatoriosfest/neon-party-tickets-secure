
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";

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

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <MotionConfig reducedMotion="user">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/eventos" element={<Home />} />
                  <Route path="/eventos/:id" element={<EventDetail />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/meus-ingressos" element={
                    <ProtectedRoute>
                      <MyTickets />
                    </ProtectedRoute>
                  } />
                  <Route path="/minha-conta" element={
                    <ProtectedRoute>
                      <UserAccount />
                    </ProtectedRoute>
                  } />
                  <Route path="/minha-conta/email" element={
                    <ProtectedRoute>
                      <UserAccount />
                    </ProtectedRoute>
                  } />
                  <Route path="/minha-conta/senha" element={
                    <ProtectedRoute>
                      <UserAccount />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin" element={
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  } />
                  <Route path="/admin/dashboard" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  <Route path="/admin/verificador" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  <Route path="/access-denied" element={<AccessDenied />} />
                  <Route path="/payment-success" element={<Home />} />
                  <Route path="/payment-canceled" element={<Home />} />
                  <Route path="/politica-privacidade" element={<Home />} />
                  <Route path="/termos-uso" element={<Home />} />
                  <Route path="/sobre" element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
                <Sonner />
              </MotionConfig>
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
