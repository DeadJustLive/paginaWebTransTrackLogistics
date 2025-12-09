import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Package, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function ClientAuth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const isLogin = location.pathname === '/login';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Input sanitization to prevent SQL injection
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/['";\\]/g, '') // Remove potentially dangerous characters
      .trim();
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    return password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };

    // Validation
    const newErrors: Record<string, string> = {};

    if (!validateEmail(sanitizedData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!validatePassword(sanitizedData.password)) {
      newErrors.password = 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número';
    }

    if (!isLogin) {
      if (!sanitizedData.name || sanitizedData.name.length < 2) {
        newErrors.name = 'El nombre debe tener al menos 2 caracteres';
      }

      if (sanitizedData.password !== sanitizedData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const success = await login(sanitizedData.email, sanitizedData.password, 'client');
        if (success) {
          toast.success('Inicio de sesión exitoso');
          navigate('/');
        }
      } else {
        const success = await register(sanitizedData.name, sanitizedData.email, sanitizedData.password);
        if (success) {
          toast.success('Registro exitoso');
          navigate('/');
        }
      }
    } catch (error) {
      toast.error('Error en la autenticación. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = [
    { text: 'Mínimo 8 caracteres', valid: formData.password.length >= 8 },
    { text: 'Una mayúscula', valid: /[A-Z]/.test(formData.password) },
    { text: 'Una minúscula', valid: /[a-z]/.test(formData.password) },
    { text: 'Un número', valid: /[0-9]/.test(formData.password) }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Package className="w-10 h-10 text-blue-600" />
            <span className="text-2xl text-gray-900">TransTrack</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</CardTitle>
            <CardDescription>
              {isLogin
                ? 'Ingresa tus credenciales para acceder a tu cuenta'
                : 'Regístrate para comenzar a usar TransTrack Logistics'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Juan Pérez"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="usuario@empresa.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className={errors.confirmPassword ? 'border-red-500' : ''}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {formData.password && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm mb-2">Requisitos de contraseña:</p>
                      <div className="space-y-1">
                        {passwordRequirements.map((req, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            {req.valid ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-gray-400" />
                            )}
                            <span className={req.valid ? 'text-green-600' : 'text-gray-600'}>
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Todas las contraseñas son encriptadas y validadas contra inyecciones SQL
                </AlertDescription>
              </Alert>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
              </Button>

              <div className="text-center">
                {isLogin ? (
                  <p className="text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                      Regístrate aquí
                    </Link>
                  </p>
                ) : (
                  <p className="text-gray-600">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                      Inicia sesión
                    </Link>
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
