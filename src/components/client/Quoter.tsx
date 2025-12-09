import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientNavbar from './ClientNavbar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calculator, Package, MapPin, Truck, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface QuoteResult {
  basePrice: number;
  insurance: number;
  tax: number;
  total: number;
  estimatedDays: number;
}

export default function Quoter() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    volume: '',
    serviceType: '',
    cargo: ''
  });
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateQuote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.origin || !formData.destination || !formData.weight || !formData.volume || !formData.serviceType) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Calculate quote based on weight, volume, and service type
    const weight = parseFloat(formData.weight);
    const volume = parseFloat(formData.volume);

    const baseRates = {
      standard: 2.5,
      express: 5.0,
      overnight: 8.5
    };

    const rate = baseRates[formData.serviceType as keyof typeof baseRates] || 2.5;
    const basePrice = (weight * rate) + (volume * 15);
    const insurance = basePrice * 0.03; // 3% insurance
    const tax = (basePrice + insurance) * 0.19; // 19% IVA
    const total = basePrice + insurance + tax;

    const estimatedDays = {
      standard: 5,
      express: 2,
      overnight: 1
    }[formData.serviceType as keyof typeof baseRates] || 5;

    setQuote({
      basePrice,
      insurance,
      tax,
      total,
      estimatedDays
    });

    setLoading(false);
    toast.success('Cotización generada exitosamente');
  };

  const handleProceedToPayment = () => {
    if (quote) {
      navigate('/payment', { state: { quote, formData } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="mb-4">Cotizador Automático</h1>
          <p className="text-gray-600">
            Obtén una cotización instantánea para tu envío
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quote Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Datos del Envío
              </CardTitle>
              <CardDescription>
                Ingresa la información de tu carga
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e: React.FormEvent) => calculateQuote(e)} className="space-y-4">
                <div>
                  <Label htmlFor="origin">Ciudad de Origen *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="origin"
                      value={formData.origin}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, origin: e.target.value })}
                      placeholder="Santiago"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="destination">Ciudad de Destino *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="destination"
                      value={formData.destination}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="Valparaíso"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weight">Peso (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      min="0"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="volume">Volumen (m³) *</Label>
                    <Input
                      id="volume"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.volume}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, volume: e.target.value })}
                      placeholder="2.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="serviceType">Tipo de Servicio *</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value: string) => setFormData({ ...formData, serviceType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4" />
                          Estándar (5 días)
                        </div>
                      </SelectItem>
                      <SelectItem value="express">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4" />
                          Express (2 días)
                        </div>
                      </SelectItem>
                      <SelectItem value="overnight">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4" />
                          Overnight (1 día)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="cargo">Descripción de la Carga</Label>
                  <Input
                    id="cargo"
                    value={formData.cargo}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, cargo: e.target.value })}
                    placeholder="Productos electrónicos"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Calculando...' : 'Generar Cotización'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quote Result */}
          <div>
            <Card className={quote ? 'border-blue-200 shadow-lg' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Resultado de Cotización
                </CardTitle>
              </CardHeader>
              <CardContent>
                {quote ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span>Detalles del Servicio</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ruta:</span>
                          <span>{formData.origin} → {formData.destination}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Peso:</span>
                          <span>{formData.weight} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Volumen:</span>
                          <span>{formData.volume} m³</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tiempo estimado:</span>
                          <span>{quote.estimatedDays} {quote.estimatedDays === 1 ? 'día' : 'días'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Precio base:</span>
                        <span>${quote.basePrice.toLocaleString('es-CL', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Seguro (3%):</span>
                        <span>${quote.insurance.toLocaleString('es-CL', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">IVA (19%):</span>
                        <span>${quote.tax.toLocaleString('es-CL', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span className="text-2xl text-blue-600">
                            ${quote.total.toLocaleString('es-CL', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <Button
                        onClick={handleProceedToPayment}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Proceder al Pago
                      </Button>
                      <Button
                        onClick={() => setQuote(null)}
                        variant="outline"
                        className="w-full"
                      >
                        Nueva Cotización
                      </Button>
                    </div>

                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                      ✓ Seguro de carga incluido<br />
                      ✓ Tracking en tiempo real<br />
                      ✓ Atención 24/7
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Calculator className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p>Completa el formulario para generar tu cotización</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
