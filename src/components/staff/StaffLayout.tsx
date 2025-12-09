import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, LayoutDashboard, Package, Warehouse, Route, FileText, BarChart3, Bell, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

interface StaffLayoutProps {
  children: ReactNode;
}

export default function StaffLayout({ children }: StaffLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/staff/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/staff/dashboard' },
    { icon: Package, label: 'Gestión de Pedidos', path: '/staff/orders' },
    { icon: Warehouse, label: 'Inventario RFID', path: '/staff/inventory' },
    { icon: Route, label: 'Optimización de Rutas', path: '/staff/routes' },
    { icon: FileText, label: 'Documentos', path: '/staff/documents' },
    { icon: BarChart3, label: 'Reportes Financieros', path: '/staff/reports' },
    { icon: Bell, label: 'Notificaciones', path: '/staff/notifications' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
            <Link to="/staff/dashboard" className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              <span className="text-xl">TransTrack Staff</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 hidden md:inline">
              {user?.name || 'Usuario'}
            </span>
            <Button variant="outline" onClick={handleLogout} size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-16 left-0 bottom-0 w-64 bg-white border-r z-40 transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
