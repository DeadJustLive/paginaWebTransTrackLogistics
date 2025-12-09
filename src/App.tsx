import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';

// External Client Pages
import ClientLanding from './components/client/ClientLanding';
import ClientAuth from './components/client/ClientAuth';
import Quoter from './components/client/Quoter';
import Payment from './components/client/Payment';
import Tracking from './components/client/Tracking';

// Internal Staff Pages
import StaffLogin from './components/staff/StaffLogin';
import StaffDashboard from './components/staff/StaffDashboard';
import OrderManagement from './components/staff/OrderManagement';
import InventoryManagement from './components/staff/InventoryManagement';
import RouteOptimization from './components/staff/RouteOptimization';
import DocumentGeneration from './components/staff/DocumentGeneration';
import FinancialReports from './components/staff/FinancialReports';
import NotificationsPanel from './components/staff/NotificationsPanel';

// Context for user authentication
import { AuthProvider } from './components/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Client Routes */}
            <Route path="/" element={<ClientLanding />} />
            <Route path="/login" element={<ClientAuth />} />
            <Route path="/register" element={<ClientAuth />} />
            <Route path="/quote" element={<Quoter />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/tracking" element={<Tracking />} />


            {/* Staff Routes */}
            <Route path="/staff/login" element={<StaffLogin />} />
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
            <Route path="/staff/orders" element={<OrderManagement />} />
            <Route path="/staff/inventory" element={<InventoryManagement />} />
            <Route path="/staff/routes" element={<RouteOptimization />} />
            <Route path="/staff/documents" element={<DocumentGeneration />} />
            <Route path="/staff/reports" element={<FinancialReports />} />
            <Route path="/staff/notifications" element={<NotificationsPanel />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
