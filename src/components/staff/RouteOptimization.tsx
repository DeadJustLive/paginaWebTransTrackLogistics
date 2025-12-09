import { useState } from 'react';
import StaffLayout from './StaffLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Truck, MapPin, Clock, DollarSign, Zap, RefreshCw } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Route {
  id: string;
  vehiculo: string;
  conductor: string;
  paradas: number;
  distancia: number;
  tiempoEstimado: string;
  costo: number;
  estado: 'activa' | 'completada' | 'planificada';
  pedidos: string[];
  eficiencia: number;
}

export default function RouteOptimization() {
  const [optimizing, setOptimizing] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([
    {
      id: 'R001',
      vehiculo: 'Camión 3.5T - ABC123',
      conductor: 'Juan Pérez',
      paradas: 8,
      distancia: 145,
      tiempoEstimado: '4h 30min',
      costo: 45000,
      estado: 'activa',
      pedidos: ['TT12345', 'TT12346', 'TT12350', 'TT12351', 'TT12352', 'TT12353', 'TT12354', 'TT12355'],
      eficiencia: 92
    },
    {
      id: 'R002',
      vehiculo: 'Van 1.5T - XYZ789',
      conductor: 'María González',
      paradas: 5,
      distancia: 78,
      tiempoEstimado: '2h 45min',
      costo: 28000,
      estado: 'activa',
      pedidos: ['TT12347', 'TT12348', 'TT12349', 'TT12356', 'TT12357'],
      eficiencia: 88
    },
    {
      id: 'R003',
      vehiculo: 'Camión 5T - DEF456',
      conductor: 'Carlos Rodríguez',
      paradas: 12,
      distancia: 230,
      tiempoEstimado: '6h 15min',
      costo: 68000,
      estado: 'planificada',
      pedidos: ['TT12358', 'TT12359', 'TT12360', 'TT12361', 'TT12362', 'TT12363', 'TT12364', 'TT12365', 'TT12366', 'TT12367', 'TT12368', 'TT12369'],
      eficiencia: 85
    }
  ]);

  const handleOptimize = async (routeId: string) => {
    setOptimizing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setRoutes(routes.map(route => {
      if (route.id === routeId) {
        return {
          ...route,
          distancia: Math.round(route.distancia * 0.85),
          costo: Math.round(route.costo * 0.88),
          eficiencia: Math.min(98, route.eficiencia + 8),
          tiempoEstimado: calculateOptimizedTime(route.tiempoEstimado)
        };
      }
      return route;
    }));

    setOptimizing(false);
    toast.success('Ruta optimizada exitosamente');
  };

  const calculateOptimizedTime = (time: string): string => {
    const match = time.match(/(\d+)h (\d+)min/);
    if (!match) return time;
    
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const totalMinutes = hours * 60 + minutes;
    const optimizedMinutes = Math.round(totalMinutes * 0.85);
    
    const newHours = Math.floor(optimizedMinutes / 60);
    const newMinutes = optimizedMinutes % 60;
    
    return `${newHours}h ${newMinutes}min`;
  };

  const getStatusBadge = (estado: string) => {
    const badges = {
      'activa': 'bg-green-100 text-green-800',
      'completada': 'bg-blue-100 text-blue-800',
      'planificada': 'bg-yellow-100 text-yellow-800'
    };
    return badges[estado as keyof typeof badges];
  };

  const getStatusText = (estado: string) => {
    const text = {
      'activa': 'Activa',
      'completada': 'Completada',
      'planificada': 'Planificada'
    };
    return text[estado as keyof typeof text];
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalStats = {
    rutas: routes.length,
    paradas: routes.reduce((sum, r) => sum + r.paradas, 0),
    distancia: routes.reduce((sum, r) => sum + r.distancia, 0),
    costo: routes.reduce((sum, r) => sum + r.costo, 0)
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        <div>
          <h1 className="mb-2">Optimización de Rutas</h1>
          <p className="text-gray-600">Gestión inteligente de rutas y asignación de vehículos</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Truck className="w-8 h-8 text-blue-600" />
                <span className="text-2xl">{totalStats.rutas}</span>
              </div>
              <p className="text-gray-600">Rutas Activas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <MapPin className="w-8 h-8 text-green-600" />
                <span className="text-2xl">{totalStats.paradas}</span>
              </div>
              <p className="text-gray-600">Total Paradas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-purple-600" />
                <span className="text-2xl">{totalStats.distancia}km</span>
              </div>
              <p className="text-gray-600">Distancia Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-yellow-600" />
                <span className="text-2xl">${(totalStats.costo / 1000).toFixed(0)}k</span>
              </div>
              <p className="text-gray-600">Costo Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Routes */}
        <div className="space-y-4">
          {routes.map((route) => (
            <Card key={route.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Truck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="mb-1">Ruta {route.id}</h3>
                      <p className="text-sm text-gray-600">{route.vehiculo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className={`w-4 h-4 ${getEfficiencyColor(route.eficiencia)}`} />
                        <span className={`${getEfficiencyColor(route.eficiencia)}`}>
                          {route.eficiencia}% Eficiencia
                        </span>
                      </div>
                      <Badge className={getStatusBadge(route.estado)}>
                        {getStatusText(route.estado)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Conductor</p>
                    <p>{route.conductor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Paradas</p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {route.paradas} puntos
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Distancia</p>
                    <p>{route.distancia} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tiempo Estimado</p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {route.tiempoEstimado}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Costo</p>
                    <p className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      ${route.costo.toLocaleString('es-CL')}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 mb-2">Pedidos Asignados ({route.pedidos.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {route.pedidos.map((pedido) => (
                      <Badge key={pedido} variant="outline" className="font-mono">
                        {pedido}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Ruta Optimizada con IA</span>
                  </div>
                  <div className="h-32 bg-white rounded border-2 border-blue-200 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Mapa de Ruta Mock</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleOptimize(route.id)}
                    disabled={optimizing || route.eficiencia >= 95}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${optimizing ? 'animate-spin' : ''}`} />
                    {optimizing ? 'Optimizando...' : 'Optimizar Ruta'}
                  </Button>
                  <Button variant="outline">
                    Ver Detalles
                  </Button>
                  {route.estado === 'planificada' && (
                    <Button variant="outline" className="bg-green-50 hover:bg-green-100">
                      Activar Ruta
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Optimization Info */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-blue-900 mb-2">Sistema de Optimización Inteligente</h4>
                <p className="text-sm text-blue-800 mb-2">
                  Nuestro algoritmo de optimización utiliza inteligencia artificial para:
                </p>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Reducir distancias de recorrido hasta en un 30%</li>
                  <li>Minimizar tiempos de entrega</li>
                  <li>Optimizar consumo de combustible</li>
                  <li>Balancear carga entre vehículos</li>
                  <li>Considerar tráfico en tiempo real</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StaffLayout>
  );
}
