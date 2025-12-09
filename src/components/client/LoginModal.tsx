import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegisterClick: () => void;
}

export default function LoginModal({ isOpen, onClose, onRegisterClick }: LoginModalProps) {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    // Input sanitization
    const sanitizeInput = (input: string): string => {
        return input.replace(/['";\\]/g, '').trim();
    };

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const sanitizedData = {
            email: sanitizeInput(formData.email),
            password: formData.password
        };

        const newErrors: Record<string, string> = {};

        if (!validateEmail(sanitizedData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!sanitizedData.password) {
            newErrors.password = 'La contraseña es requerida';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const success = await login(sanitizedData.email, sanitizedData.password, 'client');
            if (success) {
                toast.success('Inicio de sesión exitoso');
                onClose();
                // Optional: navigate to dashboard if needed, or stay on current page
            }
        } catch (error) {
            toast.error('Error en la autenticación. Por favor intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-blue-50 rounded-full">
                            <Package className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <DialogTitle className="text-2xl text-center">Bienvenido de nuevo</DialogTitle>
                    <DialogDescription className="text-center">
                        Ingresa tus credenciales para acceder a tu cuenta
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4 ">
                    <div className="space-y-2">
                        <Label htmlFor="modal-email">Email</Label>
                        <Input
                            id="modal-email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="nombre@empresa.com"
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="modal-password">Contraseña</Label>
                            <Button
                                variant="link"
                                className="p-0 h-auto text-xs font-normal"
                                type="button"
                                onClick={() => toast.info('Funcionalidad de recuperación en desarrollo')}
                            >
                                ¿Olvidaste tu contraseña?
                            </Button>
                        </div>
                        <Input
                            id="modal-password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            className={errors.password ? 'border-red-500' : ''}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password}</p>
                        )}
                    </div>

                    <Alert className="bg-blue-50 border-blue-200">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800 text-xs">
                            Tus datos están protegidos con encriptación de extremo a extremo
                        </AlertDescription>
                    </Alert>

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </Button>

                    <div className="text-center text-sm text-gray-500 mt-4">
                        ¿No tienes una cuenta?{' '}
                        <Button
                            variant="link"
                            className="p-0 h-auto font-semibold text-blue-600 hover:underline"
                            onClick={onRegisterClick}
                            type="button"
                        >
                            Regístrate aquí
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
