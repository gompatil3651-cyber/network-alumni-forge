import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Header from "@/components/Layout/Header";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import Dashboard from "@/pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to dashboard if authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

// Main App Component
const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentRole, setCurrentRole] = useState('alumni');

  return (
    <>
      <Toaster />
      <Sonner />
      {isAuthenticated && (
        <Header 
          onRoleSwitch={setCurrentRole} 
          currentRole={currentRole}
        />
      )}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        } />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard 
              currentRole={currentRole} 
              onRoleChange={setCurrentRole} 
            />
          </ProtectedRoute>
        } />
        
        {/* Placeholder routes for future implementation */}
        <Route path="/events" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Events</h1>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/mentorship" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Mentorship</h1>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/jobs" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Jobs & Internships</h1>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/communities" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Communities</h1>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </div>
          </ProtectedRoute>
        } />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
