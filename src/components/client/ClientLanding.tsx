import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, Truck, MapPin, Shield, Clock, DollarSign, ArrowUp, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import ClientNavbar from './ClientNavbar';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import QuoterModal from './QuoterModal';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import ContactSection from './ContactSection';
import TrackingSection from './TrackingSection';

export default function ClientLanding() {
  const [isQuoterModalOpen, setIsQuoterModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show button when Hero is NOT intersecting (user scrolled past it)
        setShowScrollTop(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    {
      icon: Truck,
      title: 'Transporte Terrestre',
      description: 'Cobertura nacional con seguimiento en tiempo real'
    },
    {
      icon: Package,
      title: 'Almacenamiento',
      description: 'Bodegas con tecnología RFID para control de inventario'
    },
    {
      icon: MapPin,
      title: 'Tracking GPS',
      description: 'Monitoreo 24/7 de tus envíos'
    },
    {
      icon: Shield,
      title: 'Seguro de Carga',
      description: 'Protección completa para tu mercancía'
    },
    {
      icon: Clock,
      title: 'Entregas Puntuales',
      description: 'Optimización de rutas para máxima eficiencia'
    },
    {
      icon: DollarSign,
      title: 'Cotización Instantánea',
      description: 'Precios competitivos al instante'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <ClientNavbar />

      {/* Hero Section */}
      <section ref={heroRef} className="auto h-[600px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1726776230751-183496c51f00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjB3YXJlaG91c2UlMjB0cnVja3xlbnwxfHx8fDE3NjI2OTk0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="TransTrack Logistics"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="mb-6 text-2xl ">TransTrack Logistics</h1>
          <p className="mb-8 text-xl">
            Soluciones logísticas inteligentes con tecnología de punta.
            Seguimiento en tiempo real y optimización de rutas para tu negocio.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsQuoterModalOpen(true)}
            >
              Cotizar Envío
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20"
              onClick={() => document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Rastrear Pedido
            </Button>
          </div>
          <h2 className="text-1xl font-bold mb-4">Síguenos en Redes Sociales</h2>

          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex gap-2 items-center justify-center" >
              <a
                href="#"
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Nuestros Servicios</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ofrecemos soluciones logísticas completas adaptadas a las necesidades de tu empresa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Planes de Envío</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tu volumen de envíos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <Card className="flex flex-col hover:shadow-xl transition-shadow relative overflow-hidden h-full">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl font-bold text-gray-900">Básico</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">/mes</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Para envíos ocasionales</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-4 my-6 flex-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>Rastreo básico</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>Cotización instantánea</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>Soporte por email</span>
                  </li>
                </ul>
                <Button className="w-full mt-auto" variant="outline" onClick={() => setIsQuoterModalOpen(true)}>
                  Empezar ahora
                </Button>
              </CardContent>
            </Card>

            {/* Standard Plan */}
            <Card className="flex flex-col hover:shadow-xl transition-shadow border-2 border-blue-600 relative overflow-hidden transform md:-translate-y-4 z-10 h-full bg-white">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                POPULAR
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl font-bold text-blue-600">Empresas</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$29.990</span>
                  <span className="text-gray-600">/mes</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Para PyMEs en crecimiento</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-4 my-6 flex-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>Rastreo GPS en tiempo real</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>Dashboard administrativo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>Soporte prioritario</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>Facturación mensual</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-auto" onClick={() => setIsQuoterModalOpen(true)}>
                  Contratar Plan
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="flex flex-col hover:shadow-xl transition-shadow relative overflow-hidden h-full">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl font-bold text-gray-900">Corporativo</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">Cotizar</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Para grandes volúmenes</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-4 my-6 flex-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>API de integración</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>Gestor de cuenta dedicado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>Rutas dedicadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>Seguros personalizados</span>
                  </li>
                </ul>
                <Button className="w-full mt-auto" variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Contactar Ventas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">¿Por qué elegir TransTrack?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    ✓
                  </div>
                  <div>
                    <h4>Tecnología RFID</h4>
                    <p className="text-gray-600">Control de inventario automatizado y preciso</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    ✓
                  </div>
                  <div>
                    <h4>Optimización de Rutas</h4>
                    <p className="text-gray-600">Algoritmos inteligentes para reducir tiempos y costos</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    ✓
                  </div>
                  <div>
                    <h4>Atención 24/7</h4>
                    <p className="text-gray-600">Soporte continuo para resolver tus dudas</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    ✓
                  </div>
                  <div>
                    <h4>Facturación Electrónica</h4>
                    <p className="text-gray-600">Documentación automática y sin papeles</p>
                  </div>
                </div>
              </div>
              <Link to="/register">
                <Button className="mt-8 bg-blue-600 hover:bg-blue-700">
                  Crear Cuenta Gratis
                </Button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1663103746090-2e4274c6c7ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMGNvbnRhaW5lciUyMHBvcnR8ZW58MXx8fHwxNzYyNjA5ODc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Shipping Operations"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <TrackingSection />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6">¿Listo para optimizar tu logística?</h2>
          <p className="mb-8 text-xl">
            Únete a cientos de empresas que confían en TransTrack para sus necesidades de transporte
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setIsQuoterModalOpen(true)}
            >
              Solicitar Cotización
            </Button>
            <Button
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:!bg-white hover:!text-blue-600 transition-colors duration-200"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contactar Ventas
            </Button>
          </div>
        </div>
      </section>

      <ContactSection />

      <QuoterModal
        isOpen={isQuoterModalOpen}
        onClose={() => setIsQuoterModalOpen(false)}
      />



      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
        style={{
          bottom: '2rem',
          right: '2rem',
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? 'translateY(0)' : 'translateY(1rem)',
          pointerEvents: showScrollTop ? 'auto' : 'none',
          visibility: showScrollTop ? 'visible' : 'hidden'
        }}
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="mb-4">TransTrack Logistics</h4>
            <p className="text-gray-400">
              Tu socio confiable en soluciones logísticas
            </p>
          </div>
          <div>
            <h5 className="mb-4">Servicios</h5>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/quote" className="hover:text-white">Cotizar</Link></li>
              <li><Link to="/tracking" className="hover:text-white">Tracking</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-4">Empresa</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Acerca de</a></li>
              <li><a href="#" className="hover:text-white">Carreras</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-4">Legal</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Privacidad</a></li>
              <li><a href="#" className="hover:text-white">Términos</a></li>
              <li><a href="#" className="hover:text-white">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2025 TransTrack Logistics. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
