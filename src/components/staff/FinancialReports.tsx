import StaffLayout from './StaffLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { TrendingUp, TrendingDown, DollarSign, Package, Clock, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

export default function FinancialReports() {
  const [period, setPeriod] = useState('6m');

  const salesData = [
    { mes: 'Ene', ventas: 3500000, costos: 1800000, ganancias: 1700000 },
    { mes: 'Feb', ventas: 4200000, costos: 2100000, ganancias: 2100000 },
    { mes: 'Mar', ventas: 3800000, costos: 1900000, ganancias: 1900000 },
    { mes: 'Abr', ventas: 5100000, costos: 2400000, ganancias: 2700000 },
    { mes: 'May', ventas: 4900000, costos: 2300000, ganancias: 2600000 },
    { mes: 'Jun', ventas: 4589000, costos: 2200000, ganancias: 2389000 }
  ];

  const deliveryTimeData = [
    { servicio: 'Estándar', promedio: 4.8, meta: 5.0 },
    { servicio: 'Express', promedio: 1.9, meta: 2.0 },
    { servicio: 'Overnight', promedio: 0.95, meta: 1.0 }
  ];

  const revenueByServiceData = [
    { name: 'Estándar', value: 45, color: '#3b82f6' },
    { name: 'Express', value: 35, color: '#8b5cf6' },
    { name: 'Overnight', value: 20, color: '#10b981' }
  ];

  const customerData = [
    { mes: 'Ene', nuevos: 12, recurrentes: 45, total: 57 },
    { mes: 'Feb', nuevos: 18, recurrentes: 52, total: 70 },
    { mes: 'Mar', nuevos: 15, recurrentes: 48, total: 63 },
    { mes: 'Abr', nuevos: 22, recurrentes: 61, total: 83 },
    { mes: 'May', nuevos: 19, recurrentes: 58, total: 77 },
    { mes: 'Jun', nuevos: 16, recurrentes: 54, total: 70 }
  ];

  const stats = [
    {
      title: 'Ingresos Totales',
      value: '$24,087,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Pedidos del Mes',
      value: '420',
      change: '+8.2%',
      trend: 'up',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Tiempo Promedio',
      value: '2.55 días',
      change: '-12.3%',
      trend: 'down',
      icon: Clock,
      color: 'purple'
    },
    {
      title: 'Margen de Ganancia',
      value: '52.1%',
      change: '+3.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'yellow'
    }
  ];

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      green: 'bg-green-500',
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      yellow: 'bg-yellow-500'
    };
    return colors[color] || 'bg-gray-500';
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">Reportes Financieros</h1>
            <p className="text-gray-600">Análisis detallado de ventas, costos y rendimiento</p>
          </div>
          <div className="flex gap-3">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Último mes</SelectItem>
                <SelectItem value="3m">3 meses</SelectItem>
                <SelectItem value="6m">6 meses</SelectItem>
                <SelectItem value="1y">1 año</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${getColorClass(stat.color)} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-green-600" />
                    )}
                    <span className="text-sm text-green-600">{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Análisis de Ingresos y Ganancias</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGanancias" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString('es-CL')}`} />
                <Legend />
                <Area type="monotone" dataKey="ventas" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVentas)" name="Ventas" />
                <Area type="monotone" dataKey="ganancias" stroke="#10b981" fillOpacity={1} fill="url(#colorGanancias)" name="Ganancias" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Delivery Time Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Tiempos de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deliveryTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="servicio" />
                  <YAxis label={{ value: 'Días', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="promedio" fill="#3b82f6" name="Promedio Real" />
                  <Bar dataKey="meta" fill="#10b981" name="Meta" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue by Service */}
          <Card>
            <CardHeader>
              <CardTitle>Ingresos por Tipo de Servicio</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueByServiceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueByServiceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Customer Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Crecimiento de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={customerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="nuevos" stroke="#3b82f6" strokeWidth={2} name="Clientes Nuevos" />
                <Line type="monotone" dataKey="recurrentes" stroke="#10b981" strokeWidth={2} name="Clientes Recurrentes" />
                <Line type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={2} name="Total" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Costos Operativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Combustible</span>
                    <span>$850,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '38.6%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Personal</span>
                    <span>$950,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '43.2%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Mantenimiento</span>
                    <span>$400,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '18.2%' }}></div>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span>$2,200,000</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { nombre: 'Empresa ABC', valor: 1250000 },
                  { nombre: 'Comercial XYZ', valor: 980000 },
                  { nombre: 'Logística Sur', valor: 850000 },
                  { nombre: 'Retail Center', valor: 720000 },
                  { nombre: 'Distribuidora Norte', valor: 650000 }
                ].map((cliente, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{index + 1}. {cliente.nombre}</span>
                    <span className="text-sm">${(cliente.valor / 1000).toFixed(0)}k</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métricas Clave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tasa de Retención</p>
                  <p className="text-2xl">87.5%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Valor Promedio por Pedido</p>
                  <p className="text-2xl">$57,350</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">ROI</p>
                  <p className="text-2xl text-green-600">+108.6%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Satisfacción Cliente</p>
                  <p className="text-2xl">4.8/5.0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StaffLayout>
  );
}
