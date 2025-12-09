import StaffLayout from './StaffLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Package, TrendingUp, Clock, AlertTriangle, DollarSign, Truck } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function StaffDashboard() {
  const stats = [
    {
      title: 'Pedidos Activos',
      value: '127',
      change: '+12%',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Ventas del Mes',
      value: '$45,890',
      change: '+8%',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Tiempo Promedio',
      value: '2.3 días',
      change: '-15%',
      icon: Clock,
      color: 'purple'
    },
    {
      title: 'Alertas',
      value: '8',
      change: '-3',
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  const salesData = [
    { month: 'Ene', ventas: 35000, entregas: 45 },
    { month: 'Feb', ventas: 42000, entregas: 52 },
    { month: 'Mar', ventas: 38000, entregas: 48 },
    { month: 'Abr', ventas: 51000, entregas: 61 },
    { month: 'May', ventas: 49000, entregas: 58 },
    { month: 'Jun', ventas: 45890, entregas: 54 }
  ];

  const orderStatusData = [
    { name: 'En Tránsito', value: 45, color: '#3b82f6' },
    { name: 'Procesando', value: 28, color: '#f59e0b' },
    { name: 'En Reparto', value: 32, color: '#8b5cf6' },
    { name: 'Entregados', value: 95, color: '#10b981' }
  ];

  const recentOrders = [
    { id: 'TT12345', cliente: 'Empresa ABC', destino: 'Valparaíso', estado: 'En Tránsito', fecha: '09 Nov' },
    { id: 'TT12346', cliente: 'Comercial XYZ', destino: 'Concepción', estado: 'Procesando', fecha: '09 Nov' },
    { id: 'TT12347', cliente: 'Logística Sur', destino: 'Temuco', estado: 'En Reparto', fecha: '08 Nov' },
    { id: 'TT12348', cliente: 'Distribuidora Norte', destino: 'Antofagasta', estado: 'En Tránsito', fecha: '08 Nov' },
    { id: 'TT12349', cliente: 'Retail Center', destino: 'Viña del Mar', estado: 'Entregado', fecha: '08 Nov' }
  ];

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500'
    };
    return colors[color] || 'bg-gray-500';
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
        <div>
          <h1 className="mb-2">Dashboard Administrativo</h1>
          <p className="text-gray-600">Resumen general de operaciones</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${getColorClass(stat.color)} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Ventas Mensuales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="ventas" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Order Status Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Estado de Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Deliveries Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Entregas por Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="entregas" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Cliente</th>
                    <th className="text-left py-3 px-4">Destino</th>
                    <th className="text-left py-3 px-4">Estado</th>
                    <th className="text-left py-3 px-4">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{order.id}</td>
                      <td className="py-3 px-4">{order.cliente}</td>
                      <td className="py-3 px-4">{order.destino}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(order.estado)}`}>
                          {order.estado}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{order.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </StaffLayout>
  );
}
