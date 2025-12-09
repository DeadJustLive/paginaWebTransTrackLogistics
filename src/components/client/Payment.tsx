import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ClientNavbar from './ClientNavbar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { CreditCard, Building, Wallet, Shield, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quote, formData } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quote) {
      toast.error('No hay cotización disponible');
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setProcessing(false);
    setSuccess(true);
    toast.success('¡Pago procesado exitosamente!');

    // Redirect to tracking after 3 seconds
    setTimeout(() => {
      navigate('/tracking');
    }, 3000);
  };

  if (!quote) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ClientNavbar />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="mb-4">No hay cotización disponible</h1>
          <p className="text-gray-600 mb-8">
            Por favor genera una cotización primero
          </p>
          <Button onClick={() => navigate('/quote')} className="bg-blue-600 hover:bg-blue-700">
            Ir al Cotizador
          </Button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ClientNavbar />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Card className="text-center border-green-200">
            <CardContent className="pt-12 pb-12">
              <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
              <h2 className="mb-4">¡Pago Exitoso!</h2>
              <p className="text-gray-600 mb-6">
                Tu orden ha sido creada. Número de tracking: <strong>TT{Math.random().toString(36).substr(2, 9).toUpperCase()}</strong>
              </p>
              <p className="text-gray-600">
                Redirigiendo al panel de tracking...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="mb-4">Pago Seguro</h1>
          <p className="text-gray-600">
            Completa tu pago para procesar el envío
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Método de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 border p-4 rounded-lg cursor-pointer hover:border-blue-500">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5" />
                      Tarjeta de Crédito/Débito
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-lg cursor-pointer hover:border-blue-500">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Label htmlFor="bank-transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Building className="w-5 h-5" />
                      Transferencia Bancaria
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-lg cursor-pointer hover:border-blue-500">
                    <RadioGroupItem value="digital-wallet" id="digital-wallet" />
                    <Label htmlFor="digital-wallet" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Wallet className="w-5 h-5" />
                      Billetera Digital
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'credit-card' && (
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                      <Input
                        id="cardNumber"
                        value={cardData.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                          setCardData({ ...cardData, cardNumber: value });
                        }}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                      <Input
                        id="cardName"
                        value={cardData.cardName}
                        onChange={(e) => setCardData({ ...cardData, cardName: e.target.value })}
                        placeholder="JUAN PÉREZ"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Fecha de Vencimiento</Label>
                        <Input
                          id="expiryDate"
                          value={cardData.expiryDate}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            }
                            setCardData({ ...cardData, expiryDate: value });
                          }}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p>Tus datos están protegidos con encriptación SSL de 256 bits.
                          Esta es una simulación de pasarela de pago para fines demostrativos.</p>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={processing}
                    >
                      {processing ? 'Procesando Pago...' : `Pagar $${quote.total.toLocaleString('es-CL', { minimumFractionDigits: 2 })}`}
                    </Button>
                  </form>
                )}

                {paymentMethod === 'bank-transfer' && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="mb-2">Datos Bancarios</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Banco:</strong> Banco de Chile</p>
                        <p><strong>Cuenta Corriente:</strong> 1234567890</p>
                        <p><strong>RUT:</strong> 76.123.456-7</p>
                        <p><strong>Nombre:</strong> TransTrack Logistics SpA</p>
                        <p><strong>Email:</strong> pagos@transtrack.cl</p>
                      </div>
                    </div>
                    <Button onClick={handlePayment} className="w-full bg-green-600 hover:bg-green-700" disabled={processing}>
                      {processing ? 'Procesando...' : 'Confirmar Transferencia'}
                    </Button>
                  </div>
                )}

                {paymentMethod === 'digital-wallet' && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="mb-4">Escanea el código QR con tu aplicación de billetera digital</p>
                      <div className="w-48 h-48 bg-white border-2 border-gray-300 mx-auto flex items-center justify-center">
                        <p className="text-gray-400">QR Code Mock</p>
                      </div>
                    </div>
                    <Button onClick={handlePayment} className="w-full bg-green-600 hover:bg-green-700" disabled={processing}>
                      {processing ? 'Procesando...' : 'Confirmar Pago'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Origen:</span>
                    <span>{formData.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Destino:</span>
                    <span>{formData.destination}</span>
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
                    <span className="text-gray-600">Servicio:</span>
                    <span className="capitalize">{formData.serviceType}</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Precio base:</span>
                    <span>${quote.basePrice.toLocaleString('es-CL', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Seguro:</span>
                    <span>${quote.insurance.toLocaleString('es-CL', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IVA:</span>
                    <span>${quote.tax.toLocaleString('es-CL', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="text-2xl text-blue-600">
                      ${quote.total.toLocaleString('es-CL', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded text-sm text-green-800">
                  <p>✓ Entrega en {quote.estimatedDays} {quote.estimatedDays === 1 ? 'día' : 'días'}</p>
                  <p>✓ Tracking en tiempo real</p>
                  <p>✓ Seguro incluido</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
