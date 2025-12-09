import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calculator, Package, MapPin, Truck, ArrowRight, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface QuoteResult {
    basePrice: number;
    insurance: number;
    tax: number;
    total: number;
    estimatedDays: number;
}

interface QuoterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QuoterModal({ isOpen, onClose }: QuoterModalProps) {
    const navigate = useNavigate();
    const [step, setStep] = useState<'form' | 'result'>('form');
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState<QuoteResult | null>(null);

    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        weight: '',
        volume: '',
        serviceType: ''
    });

    const resetModal = () => {
        setStep('form');
        setFormData({
            origin: '',
            destination: '',
            weight: '',
            volume: '',
            serviceType: ''
        });
        setQuote(null);
        onClose();
    };

    const calculateQuote = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.origin || !formData.destination || !formData.weight || !formData.serviceType) {
            toast.error('Por favor completa los campos principales');
            return;
        }

        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // Calculate quote logic (simplified for modal)
        const weight = parseFloat(formData.weight);
        const volume = formData.volume ? parseFloat(formData.volume) : (weight * 0.005); // Estimate volume if empty

        const baseRates = {
            standard: 2.5,
            express: 5.0,
            overnight: 8.5
        };

        const rate = baseRates[formData.serviceType as keyof typeof baseRates] || 2.5;
        const basePrice = (weight * rate) + (volume * 15);
        const insurance = basePrice * 0.03;
        const tax = (basePrice + insurance) * 0.19;
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
        setStep('result');
    };

    const handleProceedToPayment = () => {
        if (quote) {
            navigate('/payment', { state: { quote, formData } });
            onClose();
        }
    };

    const handleDetailedQuote = () => {
        navigate('/quote');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={resetModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        {step === 'form' ? (
                            <>
                                <Calculator className="w-5 h-5 text-blue-600" />
                                Cotización Rápida
                            </>
                        ) : (
                            <>
                                <DollarSign className="w-5 h-5 text-green-600" />
                                Tu Cotización
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {step === 'form'
                            ? 'Calcula el costo de tu envío en segundos'
                            : 'Resumen estimado de costos y tiempos'}
                    </DialogDescription>
                </DialogHeader>

                {step === 'form' ? (
                    <form onSubmit={calculateQuote} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="modal-origin">Origen</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="modal-origin"
                                        value={formData.origin}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, origin: e.target.value })}
                                        placeholder="Ciudad Origen"
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="modal-destination">Destino</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="modal-destination"
                                        value={formData.destination}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, destination: e.target.value })}
                                        placeholder="Ciudad Destino"
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="modal-weight">Peso (kg)</Label>
                                <Input
                                    id="modal-weight"
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={formData.weight}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, weight: e.target.value })}
                                    placeholder="ej: 10"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="modal-volume">Volumen (m³) <span className="text-gray-400 font-normal text-xs">(Op. inv)</span></Label>
                                <Input
                                    id="modal-volume"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.volume}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, volume: e.target.value })}
                                    placeholder="ej: 0.5"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="modal-service">Tipo de Servicio</Label>
                            <Select
                                value={formData.serviceType}
                                onValueChange={(value: string) => setFormData({ ...formData, serviceType: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona rapidez" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="standard">Estándar (5 días)</SelectItem>
                                    <SelectItem value="express">Express (2 días)</SelectItem>
                                    <SelectItem value="overnight">Overnight (1 día)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <DialogFooter className="pt-4">
                            <Button type="button" variant="ghost" onClick={handleDetailedQuote}>
                                Cotización Avanzada
                            </Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
                                {loading ? 'Calculando...' : 'Calcular Precio'}
                            </Button>
                        </DialogFooter>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Costo Total Estimado</p>
                                    <p className="text-3xl font-bold text-blue-700">
                                        ${quote?.total.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500 mb-1">Tiempo Estimado</p>
                                    <div className="flex items-center gap-1 text-indigo-700 font-semibold">
                                        <Truck className="w-4 h-4" />
                                        {quote?.estimatedDays} {quote?.estimatedDays === 1 ? 'día' : 'días'}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 border-t border-blue-100 pt-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Servicio</span>
                                    <span className="font-medium capitalize">{formData.serviceType}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Ruta</span>
                                    <span className="font-medium">{formData.origin} → {formData.destination}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Carga</span>
                                    <span className="font-medium">{formData.weight} kg</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={handleProceedToPayment}
                                className="w-full bg-green-600 hover:bg-green-700 text-lg h-12"
                            >
                                Contratar Servicio <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" onClick={() => setStep('form')}>
                                    Recalcular
                                </Button>
                                <Button variant="ghost" onClick={handleDetailedQuote}>
                                    Ver Detalles
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
