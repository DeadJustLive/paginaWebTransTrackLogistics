import { useState } from 'react';
import ClientNavbar from './ClientNavbar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { MapPin, Package, Truck, CheckCircle, Clock, Radio } from 'lucide-react';
import { toast } from 'sonner';

interface TrackingEvent {
  id: string;
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

interface OrderDetails {
  trackingNumber: string;
  status: 'processing' | 'in-transit' | 'out-for-delivery' | 'delivered';
  origin: string;
  destination: string;
  estimatedDelivery: string;
  currentLocation: string;
  rfidTag: string;
  gpsCoordinates: { lat: number; lng: number };
  events: TrackingEvent[];
}

export default function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const trackOrder = async () => {
    if (!trackingNumber.trim()) {
      toast.error('Por favor ingresa un número de tracking');
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock tracking data
    const mockOrder: OrderDetails = {
      trackingNumber: trackingNumber.toUpperCase(),
      status: 'in-transit',
      origin: 'Santiago, Región Metropolitana',
      destination: 'Valparaíso, Región de Valparaíso',
      estimatedDelivery: '10 Nov 2025',
      currentLocation: 'Centro de Distribución - Ruta 68 KM 45',
      rfidTag: 'RFID-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      gpsCoordinates: { lat: -33.3470, lng: -71.2256 },
      events: [
        {
          id: '1',
          status: 'Procesando',
          location: 'Santiago - Bodega Central',
          timestamp: '08 Nov 2025 09:00',
          description: 'Orden recibida y procesada. Tag RFID asignado.'
        },
        {
          id: '2',
          status: 'Embalado',
          location: 'Santiago - Bodega Central',
          timestamp: '08 Nov 2025 11:30',
          description: 'Paquete embalado y verificado con sistema RFID.'
        },
        {
          id: '3',
          status: 'En Tránsito',
          location: 'Santiago - Centro de Distribución',
          timestamp: '08 Nov 2025 14:00',
          description: 'Paquete cargado en vehículo. GPS activo.'
        },
        {
          id: '4',
          status: 'En Ruta',
          location: 'Ruta 68 KM 45',
          timestamp: '09 Nov 2025 08:15',
          description: 'En tránsito hacia destino. Coordenadas GPS actualizadas.'
        }
      ]
    };

    setOrderDetails(mockOrder);
    setLoading(false);
    toast.success('Orden encontrada');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'out-for-delivery':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return 'Procesando';
      case 'in-transit':
        return 'En Tránsito';
      case 'out-for-delivery':
        return 'En Reparto';
      case 'delivered':
        return 'Entregado';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="mb-4">Seguimiento de Pedido</h1>
          <p className="text-gray-600">
            Rastrea tu envío en tiempo real con tecnología GPS y RFID
          </p>
        </div>

        {/* Search Box */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Ingresa tu número de tracking (ej: TT123456)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && trackOrder()}
                  className="h-12"
                />
              </div>
              <Button
                onClick={trackOrder}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 h-12 px-8"
              >
                {loading ? 'Buscando...' : 'Rastrear'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        {orderDetails && (
          <div className="space-y-6">
            {/* Status Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Tracking #{orderDetails.trackingNumber}
                  </CardTitle>
                  <Badge className={getStatusColor(orderDetails.status)}>
                    {getStatusText(orderDetails.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Origen</p>
                    <p>{orderDetails.origin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Destino</p>
                    <p>{orderDetails.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Entrega Estimada</p>
                    <p>{orderDetails.estimatedDelivery}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Ubicación Actual</p>
                    <p>{orderDetails.currentLocation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {/* Progress Steps */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${['processing', 'in-transit', 'out-for-delivery', 'delivered'].includes(orderDetails.status)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                        }`}>
                        <Package className="w-6 h-6" />
                      </div>
                      <p className="text-sm">Procesando</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${['in-transit', 'out-for-delivery', 'delivered'].includes(orderDetails.status)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                        }`}>
                        <Truck className="w-6 h-6" />
                      </div>
                      <p className="text-sm">En Tránsito</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${['out-for-delivery', 'delivered'].includes(orderDetails.status)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                        }`}>
                        <MapPin className="w-6 h-6" />
                      </div>
                      <p className="text-sm">En Reparto</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${orderDetails.status === 'delivered'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                        }`}>
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <p className="text-sm">Entregado</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* GPS/RFID Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Radio className="w-5 h-5" />
                    Información de Rastreo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Radio className="w-5 h-5 text-blue-600" />
                      <span>RFID Tag</span>
                    </div>
                    <p className="font-mono text-sm">{orderDetails.rfidTag}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      El tag RFID permite el escaneo automático en cada punto de control
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <span>Coordenadas GPS</span>
                    </div>
                    <p className="font-mono text-sm">
                      Lat: {orderDetails.gpsCoordinates.lat}<br />
                      Lng: {orderDetails.gpsCoordinates.lng}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Actualización en tiempo real cada 5 minutos
                    </p>
                  </div>

                  <div className="border-2 border-gray-200 rounded-lg h-64 flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-400">
                      <MapPin className="w-12 h-12 mx-auto mb-2 opacity-20" />
                      <p>Mapa GPS Mock</p>
                      <p className="text-sm">Ubicación: {orderDetails.currentLocation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Historial de Eventos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderDetails.events.map((event, index) => (
                      <div key={event.id} className="relative pl-6 pb-4">
                        {index !== orderDetails.events.length - 1 && (
                          <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200" />
                        )}
                        <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-blue-600" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span>{event.status}</span>
                            {index === orderDetails.events.length - 1 && (
                              <Badge className="bg-blue-100 text-blue-800">Último evento</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{event.location}</p>
                          <p className="text-sm text-gray-500">{event.timestamp}</p>
                          <p className="text-sm mt-1">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {!orderDetails && !loading && (
          <div className="text-center py-12 text-gray-400">
            <Package className="w-24 h-24 mx-auto mb-4 opacity-20" />
            <p>Ingresa tu número de tracking para ver el estado de tu pedido</p>
          </div>
        )}
      </div>
    </div>
  );
}
