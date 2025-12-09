import { useState } from 'react';
import StaffLayout from './StaffLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: string;
  cliente: string;
  origen: string;
  destino: string;
  peso: number;
  volumen: number;
  servicio: string;
  estado: string;
  fecha: string;
  total: number;
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 'TT12345', cliente: 'Empresa ABC', origen: 'Santiago', destino: 'Valparaíso', peso: 150, volumen: 3.5, servicio: 'Express', estado: 'En Tránsito', fecha: '09 Nov 2025', total: 125000 },
    { id: 'TT12346', cliente: 'Comercial XYZ', origen: 'Santiago', destino: 'Concepción', peso: 200, volumen: 4.2, servicio: 'Estándar', estado: 'Procesando', fecha: '09 Nov 2025', total: 98000 },
    { id: 'TT12347', cliente: 'Logística Sur', origen: 'Valparaíso', destino: 'Temuco', peso: 120, volumen: 2.8, servicio: 'Express', estado: 'En Reparto', fecha: '08 Nov 2025', total: 145000 },
    { id: 'TT12348', cliente: 'Distribuidora Norte', origen: 'Santiago', destino: 'Antofagasta', peso: 300, volumen: 6.0, servicio: 'Overnight', estado: 'En Tránsito', fecha: '08 Nov 2025', total: 285000 },
    { id: 'TT12349', cliente: 'Retail Center', origen: 'Santiago', destino: 'Viña del Mar', peso: 80, volumen: 1.5, servicio: 'Estándar', estado: 'Entregado', fecha: '08 Nov 2025', total: 65000 }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const [formData, setFormData] = useState({
    cliente: '',
    origen: '',
    destino: '',
    peso: '',
    volumen: '',
    servicio: '',
    estado: 'Procesando'
  });

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.destino.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.estado === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = () => {
    if (!formData.cliente || !formData.origen || !formData.destino || !formData.peso || !formData.volumen || !formData.servicio) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    const newOrder: Order = {
      id: 'TT' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      cliente: formData.cliente,
      origen: formData.origen,
      destino: formData.destino,
      peso: parseFloat(formData.peso),
      volumen: parseFloat(formData.volumen),
      servicio: formData.servicio,
      estado: formData.estado,
      fecha: new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' }),
      total: Math.round(parseFloat(formData.peso) * 100 + parseFloat(formData.volumen) * 1000)
    };

    setOrders([newOrder, ...orders]);
    setFormData({ cliente: '', origen: '', destino: '', peso: '', volumen: '', servicio: '', estado: 'Procesando' });
    setIsCreateOpen(false);
    toast.success('Pedido creado exitosamente');
  };

  const handleUpdate = () => {
    if (!editingOrder) return;

    const updatedOrders = orders.map(order =>
      order.id === editingOrder.id
        ? { ...editingOrder, ...formData, peso: parseFloat(formData.peso), volumen: parseFloat(formData.volumen) }
        : order
    );

    setOrders(updatedOrders);
    setEditingOrder(null);
    setFormData({ cliente: '', origen: '', destino: '', peso: '', volumen: '', servicio: '', estado: 'Procesando' });
    toast.success('Pedido actualizado exitosamente');
  };

  const handleDelete = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
    toast.success('Pedido eliminado');
  };

  const startEdit = (order: Order) => {
    setEditingOrder(order);
    setFormData({
      cliente: order.cliente,
      origen: order.origen,
      destino: order.destino,
      peso: order.peso.toString(),
      volumen: order.volumen.toString(),
      servicio: order.servicio,
      estado: order.estado
    });
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      'En Tránsito': 'bg-blue-100 text-blue-800',
      'Procesando': 'bg-yellow-100 text-yellow-800',
      'En Reparto': 'bg-purple-100 text-purple-800',
      'Entregado': 'bg-green-100 text-green-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">Gestión de Pedidos</h1>
            <p className="text-gray-600">Administra todos los pedidos del sistema</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Pedido
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Nuevo Pedido</DialogTitle>
                <DialogDescription>
                  Ingresa los datos del nuevo pedido
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cliente</Label>
                  <Input
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    placeholder="Nombre del cliente"
                  />
                </div>
                <div>
                  <Label>Servicio</Label>
                  <Select value={formData.servicio} onValueChange={(value: string) => setFormData({ ...formData, servicio: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Estándar">Estándar</SelectItem>
                      <SelectItem value="Express">Express</SelectItem>
                      <SelectItem value="Overnight">Overnight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Origen</Label>
                  <Input
                    value={formData.origen}
                    onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
                    placeholder="Ciudad origen"
                  />
                </div>
                <div>
                  <Label>Destino</Label>
                  <Input
                    value={formData.destino}
                    onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                    placeholder="Ciudad destino"
                  />
                </div>
                <div>
                  <Label>Peso (kg)</Label>
                  <Input
                    type="number"
                    value={formData.peso}
                    onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label>Volumen (m³)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.volumen}
                    onChange={(e) => setFormData({ ...formData, volumen: e.target.value })}
                    placeholder="0.0"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Estado</Label>
                  <Select value={formData.estado} onValueChange={(value: string) => setFormData({ ...formData, estado: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Procesando">Procesando</SelectItem>
                      <SelectItem value="En Tránsito">En Tránsito</SelectItem>
                      <SelectItem value="En Reparto">En Reparto</SelectItem>
                      <SelectItem value="Entregado">Entregado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
                  Crear Pedido
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar por ID, cliente o destino..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="Procesando">Procesando</SelectItem>
                  <SelectItem value="En Tránsito">En Tránsito</SelectItem>
                  <SelectItem value="En Reparto">En Reparto</SelectItem>
                  <SelectItem value="Entregado">Entregado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Cliente</th>
                    <th className="text-left py-3 px-4">Ruta</th>
                    <th className="text-left py-3 px-4">Peso/Vol</th>
                    <th className="text-left py-3 px-4">Servicio</th>
                    <th className="text-left py-3 px-4">Estado</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{order.id}</td>
                      <td className="py-3 px-4">{order.cliente}</td>
                      <td className="py-3 px-4 text-sm">
                        {order.origen} → {order.destino}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {order.peso}kg / {order.volumen}m³
                      </td>
                      <td className="py-3 px-4">{order.servicio}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusBadge(order.estado)}>
                          {order.estado}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">${order.total.toLocaleString('es-CL')}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => startEdit(order)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Editar Pedido {order.id}</DialogTitle>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Cliente</Label>
                                  <Input
                                    value={formData.cliente}
                                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label>Servicio</Label>
                                  <Select value={formData.servicio} onValueChange={(value: string) => setFormData({ ...formData, servicio: value })}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Estándar">Estándar</SelectItem>
                                      <SelectItem value="Express">Express</SelectItem>
                                      <SelectItem value="Overnight">Overnight</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Estado</Label>
                                  <Select value={formData.estado} onValueChange={(value: string) => setFormData({ ...formData, estado: value })}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Procesando">Procesando</SelectItem>
                                      <SelectItem value="En Tránsito">En Tránsito</SelectItem>
                                      <SelectItem value="En Reparto">En Reparto</SelectItem>
                                      <SelectItem value="Entregado">Entregado</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="flex justify-end gap-2 mt-4">
                                <Button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700">
                                  Guardar Cambios
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(order.id)}>
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredOrders.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No se encontraron pedidos
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </StaffLayout>
  );
}
