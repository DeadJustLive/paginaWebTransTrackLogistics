import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, Menu, X, Calculator } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import QuoterModal from './QuoterModal';

export default function ClientNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isQuoterModalOpen, setIsQuoterModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleRegisterClick = () => {
    setIsLoginModalOpen(false);
    navigate('/register');
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: 'contact' } });
    }
    setIsOpen(false);
  };

  const handleTrackingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: 'tracking' } });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-9xl px-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="text-xl text-gray-900">TransTrack</span>
            </Link>



            <div className="hidden md:flex items-center gap-2 ml-auto">
              {isAuthenticated && user?.type === 'client' ? (
                <>
                  <span className="text-gray-600">Hola, {user.name}</span>
                  <Button variant="outline" onClick={logout}>
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setIsLoginModalOpen(true)}>
                    Iniciar Sesión
                  </Button>
                  <Link to="/register">
                    <Button className="bg-blue-600 hover:bg-blue-700">Registrarse</Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="ml-2 gap-2 text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100"
                    onClick={() => setIsQuoterModalOpen(true)}
                  >
                    <Calculator className="w-4 h-4" />
                    Cotizar
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <Link
                  to="/"
                  className={`${isActive('/') ? 'text-blue-600' : 'text-gray-600'} px-4 py-2`}
                  onClick={() => setIsOpen(false)}
                >
                  Inicio
                </Link>
                <button
                  className="text-left px-4 py-2 text-gray-600 hover:text-blue-600"
                  onClick={() => {
                    setIsOpen(false);
                    setIsQuoterModalOpen(true);
                  }}
                >
                  Cotizar
                </button>
                <a
                  href="#tracking"
                  className="text-gray-600 px-4 py-2 block"
                  onClick={handleTrackingClick}
                >
                  Seguimiento
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 px-4 py-2 block"
                  onClick={handleContactClick}
                >
                  Contacto
                </a>
                <div className="px-4 pt-4 border-t flex flex-col gap-2">
                  {isAuthenticated && user?.type === 'client' ? (
                    <>
                      <span className="text-gray-600 py-2">Hola, {user.name}</span>
                      <Button variant="outline" onClick={() => { logout(); setIsOpen(false); }}>
                        Cerrar Sesión
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => {
                          setIsOpen(false);
                          setIsLoginModalOpen(true);
                        }}
                      >
                        Iniciar Sesión
                      </Button>
                      <Link to="/register" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Registrarse</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onRegisterClick={handleRegisterClick}
      />

      <QuoterModal
        isOpen={isQuoterModalOpen}
        onClose={() => setIsQuoterModalOpen(false)}
      />
    </>
  );
}
