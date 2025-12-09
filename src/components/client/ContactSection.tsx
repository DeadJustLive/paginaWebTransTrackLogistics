import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);

        // Simulate sending
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success('Mensaje enviado exitosamente. Te contactaremos pronto.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setSending(false);
    };

    return (
        <section id="contact" className="py-20 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="mb-4 text-3xl font-bold">Contáctanos</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Estamos aquí para ayudarte. Comunícate con nosotros por cualquiera de nuestros canales o envíanos un mensaje directo.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Contact Cards */}
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="mb-2 font-semibold">Dirección</h3>
                            <p className="text-gray-600">
                                Av. Apoquindo 4500, Piso 12<br />
                                Las Condes, Santiago<br />
                                Región Metropolitana
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="mb-2 font-semibold">Teléfono</h3>
                            <p className="text-gray-600">
                                +56 2 2345 6789<br />
                                +56 9 8765 4321<br />
                                Lun - Vie: 8:00 - 18:00
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="mb-2 font-semibold">Email</h3>
                            <p className="text-gray-600">
                                info@transtrack.cl<br />
                                ventas@transtrack.cl<br />
                                soporte@transtrack.cl
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Envíanos un Mensaje</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="contact-name">Nombre Completo</Label>
                                        <Input
                                            id="contact-name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            placeholder="Juan Pérez"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="contact-email">Email</Label>
                                        <Input
                                            id="contact-email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            placeholder="juan@ejemplo.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="contact-phone">Teléfono</Label>
                                        <Input
                                            id="contact-phone"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+56 9 ..."
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="contact-subject">Asunto</Label>
                                        <Input
                                            id="contact-subject"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            required
                                            placeholder="Consulta General"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="contact-message">Mensaje</Label>
                                    <Textarea
                                        id="contact-message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        placeholder="¿En qué podemos ayudarte?"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    disabled={sending}
                                >
                                    {sending ? 'Enviando...' : 'Enviar Mensaje'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Additional Info / Map */}
                    <div className="space-y-6">
                        <Card className="h-full flex flex-col">
                            <CardContent className="p-0 flex-1 relative min-h-[300px] bg-gray-100 rounded-lg overflow-hidden">
                                {/* Placeholder for map */}
                                <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-400 bg-gray-200">
                                    <MapPin className="w-12 h-12 mb-2 opacity-30" />
                                    <span className="font-semibold">Mapa de Ubicación</span>
                                    <span className="text-sm">Av. Apoquindo 4500, Santiago</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
