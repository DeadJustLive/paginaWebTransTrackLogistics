import { useState } from 'react';
import StaffLayout from './StaffLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Bell, Mail, MessageSquare, Check, X, Eye, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Notification {
  id: string;
  tipo: 'email' | 'sms' | 'push';
  asunto: string;
  destinatario: string;
  mensaje: string;
  fecha: string;
  estado: 'enviado' | 'pendiente' | 'fallido';
  categoria: 'pedido' | 'entrega' | 'pago' | 'alerta';
}

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      tipo: 'email',
      asunto: 'Confirmación de Pedido #TT12345',
      destinatario: 'cliente@empresa.com',
      mensaje: 'Tu pedido ha sido confirmado y está siendo procesado...',
      fecha: '09 Nov 11:30',
      estado: 'enviado',
      categoria: 'pedido'
    },
    {
      id: '2',
      tipo: 'sms',
      asunto: 'Pedido en camino #TT12346',
      destinatario: '+56 9 8765 4321',
      mensaje: 'Tu pedido está en camino y llegará hoy entre 14:00 y 18:00',
      fecha: '09 Nov 10:15',
      estado: 'enviado',
      categoria: 'entrega'
    },
    {
      id: '3',
      tipo: 'push',
      asunto: 'Pedido entregado #TT12347',
      destinatario: 'cliente@comercial.cl',
      mensaje: 'Tu pedido fue entregado exitosamente. Gracias por confiar en nosotros',
      fecha: '09 Nov 09:45',
      estado: 'enviado',
      categoria: 'entrega'
    },
    {
      id: '4',
      tipo: 'email',
      asunto: 'Factura #F-001-2025',
      destinatario: 'contabilidad@empresa.com',
      mensaje: 'Tu factura está disponible para descarga...',
      fecha: '09 Nov 09:00',
      estado: 'enviado',
      categoria: 'pago'
    },
    {
      id: '5',
      tipo: 'sms',
      asunto: 'Retraso en entrega #TT12348',
      destinatario: '+56 2 2345 6789',
      mensaje: 'Lamentamos informarte que tu pedido tendrá un retraso de 2 horas',
      fecha: '08 Nov 16:30',
      estado: 'enviado',
      categoria: 'alerta'
    },
    {
      id: '6',
      tipo: 'email',
      asunto: 'Confirmación de Pago',
      destinatario: 'pagos@logistica.cl',
      mensaje: 'Hemos recibido tu pago. Procesando pedido...',
      fecha: '08 Nov 15:20',
      estado: 'pendiente',
      categoria: 'pago'
    }
  ]);

  const stats = {
    total: notifications.length,
    enviados: notifications.filter(n => n.estado === 'enviado').length,
    pendientes: notifications.filter(n => n.estado === 'pendiente').length,
    fallidos: notifications.filter(n => n.estado === 'fallido').length
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'sms':
        return <MessageSquare className="w-5 h-5" />;
      case 'push':
        return <Bell className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'email':
        return 'bg-blue-100 text-blue-600';
      case 'sms':
        return 'bg-green-100 text-green-600';
      case 'push':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getEstadoBadge = (estado: string) => {
    const badges = {
      'enviado': 'bg-green-100 text-green-800',
      'pendiente': 'bg-yellow-100 text-yellow-800',
      'fallido': 'bg-red-100 text-red-800'
    };
    return badges[estado as keyof typeof badges];
  };

  const getEstadoText = (estado: string) => {
    const text = {
      'enviado': 'Enviado',
      'pendiente': 'Pendiente',
      'fallido': 'Fallido'
    };
    return text[estado as keyof typeof text];
  };

  const getCategoriaColor = (categoria: string) => {
    const colors = {
      'pedido': 'bg-blue-100 text-blue-800',
      'entrega': 'bg-green-100 text-green-800',
      'pago': 'bg-purple-100 text-purple-800',
      'alerta': 'bg-red-100 text-red-800'
    };
    return colors[categoria as keyof typeof colors];
  };

  const getCategoriaText = (categoria: string) => {
    const text = {
      'pedido': 'Pedido',
      'entrega': 'Entrega',
      'pago': 'Pago',
      'alerta': 'Alerta'
    };
    return text[categoria as keyof typeof text];
  };

  const handleResend = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, estado: 'enviado' as const, fecha: new Date().toLocaleString('es-CL', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) } : n
    ));
    toast.success('Notificación reenviada');
  };

  const filterByTipo = (tipo: string) => {
    if (tipo === 'all') return notifications;
    return notifications.filter(n => n.tipo === tipo);
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        <div>
          <h1 className="mb-2">Panel de Notificaciones</h1>
          <p className="text-gray-600">Gestión de notificaciones automáticas a clientes</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Bell className="w-8 h-8 text-blue-600" />
                <span className="text-2xl">{stats.total}</span>
              </div>
              <p className="text-gray-600">Total Enviadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Check className="w-8 h-8 text-green-600" />
                <span className="text-2xl">{stats.enviados}</span>
              </div>
              <p className="text-gray-600">Exitosas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-yellow-600" />
                <span className="text-2xl">{stats.pendientes}</span>
              </div>
              <p className="text-gray-600">Pendientes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <X className="w-8 h-8 text-red-600" />
                <span className="text-2xl">{stats.fallidos}</span>
              </div>
              <p className="text-gray-600">Fallidas</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Notificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="email">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="sms">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  SMS
                </TabsTrigger>
                <TabsTrigger value="push">
                  <Bell className="w-4 h-4 mr-2" />
                  Push
                </TabsTrigger>
              </TabsList>

              {['all', 'email', 'sms', 'push'].map((tipo) => (
                <TabsContent key={tipo} value={tipo} className="space-y-3 mt-6">
                  {filterByTipo(tipo).map((notification) => (
                    <Card key={notification.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTipoColor(notification.tipo)}`}>
                            {getTipoIcon(notification.tipo)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="mb-1">{notification.asunto}</h4>
                                <p className="text-sm text-gray-600">
                                  Para: {notification.destinatario}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Badge className={getCategoriaColor(notification.categoria)}>
                                  {getCategoriaText(notification.categoria)}
                                </Badge>
                                <Badge className={getEstadoBadge(notification.estado)}>
                                  {getEstadoText(notification.estado)}
                                </Badge>
                              </div>
                            </div>

                            <p className="text-sm text-gray-700 mb-3 bg-gray-50 p-3 rounded">
                              {notification.mensaje}
                            </p>

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">{notification.fecha}</span>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4 mr-1" />
                                  Ver
                                </Button>
                                {notification.estado !== 'enviado' && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleResend(notification.id)}
                                  >
                                    <Mail className="w-4 h-4 mr-1" />
                                    Reenviar
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Automation Info */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-blue-900 mb-2">Sistema de Notificaciones Automáticas</h4>
                <p className="text-sm text-blue-800 mb-2">
                  Las notificaciones se envían automáticamente en los siguientes eventos:
                </p>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Confirmación de pedido recibido</li>
                  <li>Actualización de estado de envío</li>
                  <li>Pedido en camino con hora estimada</li>
                  <li>Pedido entregado exitosamente</li>
                  <li>Generación de factura electrónica</li>
                  <li>Confirmación de pago recibido</li>
                  <li>Alertas de retraso o incidencias</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Plantillas de Notificación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { nombre: 'Confirmación de Pedido', usos: 145 },
                { nombre: 'Pedido en Tránsito', usos: 132 },
                { nombre: 'Pedido Entregado', usos: 128 },
                { nombre: 'Factura Generada', usos: 98 },
                { nombre: 'Pago Confirmado', usos: 87 },
                { nombre: 'Alerta de Retraso', usos: 12 }
              ].map((template, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="mb-1">{template.nombre}</h4>
                        <p className="text-sm text-gray-600">{template.usos} usos este mes</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </StaffLayout>
  );
}
