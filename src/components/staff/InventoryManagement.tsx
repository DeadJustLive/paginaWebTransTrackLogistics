import { useState } from 'react';
import StaffLayout from './StaffLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Radio, Package, Search, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Progress } from '../ui/progress';

interface InventoryItem {
  id: string;
  rfidTag: string;
  nombre: string;
  categoria: string;
  cantidad: number;
  capacidad: number;
  ubicacion: string;
  ultimoEscaneo: string;
  estado: 'disponible' | 'bajo' | 'critico';
}

export default function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [rfidScan, setRfidScan] = useState('');
  const [scanning, setScanning] = useState(false);

  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: '1', rfidTag: 'RFID-A1B2C3', nombre: 'Pallets Estándar', categoria: 'Embalaje', cantidad: 450, capacidad: 500, ubicacion: 'Bodega A - Sector 1', ultimoEscaneo: '09 Nov 10:30', estado: 'disponible' },
    { id: '2', rfidTag: 'RFID-D4E5F6', nombre: 'Cajas Pequeñas', categoria: 'Embalaje', cantidad: 180, capacidad: 1000, ubicacion: 'Bodega A - Sector 2', ultimoEscaneo: '09 Nov 09:15', estado: 'bajo' },
    { id: '3', rfidTag: 'RFID-G7H8I9', nombre: 'Material Frágil', categoria: 'Protección', cantidad: 25, capacidad: 200, ubicacion: 'Bodega B - Sector 3', ultimoEscaneo: '09 Nov 08:45', estado: 'critico' },
    { id: '4', rfidTag: 'RFID-J1K2L3', nombre: 'Straps de Seguridad', categoria: 'Sujeción', cantidad: 890, capacidad: 1000, ubicacion: 'Bodega A - Sector 1', ultimoEscaneo: '09 Nov 11:00', estado: 'disponible' },
    { id: '5', rfidTag: 'RFID-M4N5O6', nombre: 'Film Plástico', categoria: 'Embalaje', cantidad: 45, capacidad: 300, ubicacion: 'Bodega B - Sector 2', ultimoEscaneo: '08 Nov 16:20', estado: 'bajo' },
    { id: '6', rfidTag: 'RFID-P7Q8R9', nombre: 'Etiquetas RFID', categoria: 'Identificación', cantidad: 2400, capacidad: 5000, ubicacion: 'Oficina Central', ultimoEscaneo: '09 Nov 07:30', estado: 'disponible' }
  ]);

  const filteredInventory = inventory.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.rfidTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: inventory.length,
    disponible: inventory.filter(i => i.estado === 'disponible').length,
    bajo: inventory.filter(i => i.estado === 'bajo').length,
    critico: inventory.filter(i => i.estado === 'critico').length
  };

  const handleRfidScan = async () => {
    setScanning(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate RFID scan result
    const foundItem = inventory.find(item => item.rfidTag.includes(rfidScan.toUpperCase()));
    
    if (foundItem) {
      // Update last scan time
      setInventory(inventory.map(item =>
        item.id === foundItem.id
          ? { ...item, ultimoEscaneo: new Date().toLocaleString('es-CL', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) }
          : item
      ));
      setSearchTerm(foundItem.nombre);
    }
    
    setScanning(false);
    setRfidScan('');
  };

  const getStatusBadge = (estado: string) => {
    const badges = {
      'disponible': 'bg-green-100 text-green-800',
      'bajo': 'bg-yellow-100 text-yellow-800',
      'critico': 'bg-red-100 text-red-800'
    };
    return badges[estado as keyof typeof badges];
  };

  const getStatusText = (estado: string) => {
    const text = {
      'disponible': 'Disponible',
      'bajo': 'Stock Bajo',
      'critico': 'Crítico'
    };
    return text[estado as keyof typeof text];
  };

  const getStockPercentage = (cantidad: number, capacidad: number) => {
    return (cantidad / capacidad) * 100;
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        <div>
          <h1 className="mb-2">Gestión de Inventario RFID</h1>
          <p className="text-gray-600">Control de inventario con tecnología RFID</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Package className="w-8 h-8 text-blue-600" />
                <span className="text-2xl">{stats.total}</span>
              </div>
              <p className="text-gray-600">Total Items</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <span className="text-2xl">{stats.disponible}</span>
              </div>
              <p className="text-gray-600">Disponibles</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingDown className="w-8 h-8 text-yellow-600" />
                <span className="text-2xl">{stats.bajo}</span>
              </div>
              <p className="text-gray-600">Stock Bajo</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="w-8 h-8 text-red-600" />
                <span className="text-2xl">{stats.critico}</span>
              </div>
              <p className="text-gray-600">Críticos</p>
            </CardContent>
          </Card>
        </div>

        {/* RFID Scanner */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-blue-600" />
              Escaneo RFID
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Ingresa código RFID o acerca el lector..."
                  value={rfidScan}
                  onChange={(e) => setRfidScan(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && rfidScan && handleRfidScan()}
                  className="bg-white"
                />
              </div>
              <Button
                onClick={handleRfidScan}
                disabled={!rfidScan || scanning}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {scanning ? 'Escaneando...' : 'Escanear'}
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              El sistema RFID permite escaneo automático de etiquetas en tiempo real
            </p>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre, RFID o ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInventory.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="mb-1">{item.nombre}</h4>
                            <p className="text-sm text-gray-600">{item.categoria}</p>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Radio className="w-4 h-4 text-blue-600" />
                          <p className="text-sm text-gray-600">RFID Tag</p>
                        </div>
                        <p className="font-mono text-sm">{item.rfidTag}</p>
                      </div>

                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600 mb-1">Ubicación</p>
                        <p className="text-sm">{item.ubicacion}</p>
                      </div>

                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600 mb-1">Stock</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{item.cantidad} / {item.capacidad}</span>
                            <span className="text-gray-500">{Math.round(getStockPercentage(item.cantidad, item.capacidad))}%</span>
                          </div>
                          <Progress value={getStockPercentage(item.cantidad, item.capacidad)} />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600 mb-1">Último Escaneo</p>
                        <p className="text-sm">{item.ultimoEscaneo}</p>
                      </div>

                      <div className="md:col-span-1 text-right">
                        <Badge className={getStatusBadge(item.estado)}>
                          {getStatusText(item.estado)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredInventory.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No se encontraron items de inventario
              </div>
            )}
          </CardContent>
        </Card>

        {/* Alerts */}
        {stats.critico > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-900 mb-1">Alerta: Stock Crítico</h4>
                  <p className="text-sm text-red-800">
                    Hay {stats.critico} {stats.critico === 1 ? 'item' : 'items'} con stock crítico que requieren reabastecimiento inmediato
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </StaffLayout>
  );
}
