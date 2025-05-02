
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "./pages/Index";
import MyTickets from "./pages/MyTickets";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Auth guard component
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('currentUser') !== null;
  
  if (!isLoggedIn) {
    // Store the current path for redirection after login
    sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <MotionConfig reducedMotion="user">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route 
                  path="/meus-ingressos" 
                  element={
                    <AuthGuard>
                      <MyTickets />
                    </AuthGuard>
                  } 
                />
                <Route path="/admin" element={<Admin />} />
                <Route path="/payment-success" element={<Index />} />
                <Route path="/payment-canceled" element={<Index />} />
                <Route path="/politica-privacidade" element={<Index />} />
                <Route path="/termos-uso" element={<Index />} />
                <Route path="/eventos" element={<Index />} />
                <Route path="/sobre" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </MotionConfig>
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
