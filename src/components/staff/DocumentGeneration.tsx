import { useState } from 'react';
import StaffLayout from './StaffLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FileText, Download, Eye, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Document {
  id: string;
  tipo: 'factura' | 'guia' | 'recibo';
  numero: string;
  cliente: string;
  monto: number;
  fecha: string;
  estado: 'generado' | 'enviado' | 'pagado';
}

export default function DocumentGeneration() {
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    tipo: '',
    pedido: '',
    cliente: '',
    monto: ''
  });

  const [documents, setDocuments] = useState<Document[]>([
    { id: 'F-001-2025', tipo: 'factura', numero: 'F-001-2025', cliente: 'Empresa ABC', monto: 125000, fecha: '09 Nov 2025', estado: 'enviado' },
    { id: 'G-048-2025', tipo: 'guia', numero: 'G-048-2025', cliente: 'Comercial XYZ', monto: 98000, fecha: '09 Nov 2025', estado: 'generado' },
    { id: 'F-002-2025', tipo: 'factura', numero: 'F-002-2025', cliente: 'Logística Sur', monto: 145000, fecha: '08 Nov 2025', estado: 'pagado' },
    { id: 'R-012-2025', tipo: 'recibo', numero: 'R-012-2025', cliente: 'Distribuidora Norte', monto: 285000, fecha: '08 Nov 2025', estado: 'enviado' },
    { id: 'G-049-2025', tipo: 'guia', numero: 'G-049-2025', cliente: 'Retail Center', monto: 65000, fecha: '08 Nov 2025', estado: 'generado' }
  ]);

  const handleGenerate = async () => {
    if (!formData.tipo || !formData.cliente || !formData.monto) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const prefix = formData.tipo === 'factura' ? 'F' : formData.tipo === 'guia' ? 'G' : 'R';
    const numero = `${prefix}-${String(documents.length + 1).padStart(3, '0')}-2025`;

    const newDoc: Document = {
      id: numero,
      tipo: formData.tipo as 'factura' | 'guia' | 'recibo',
      numero: numero,
      cliente: formData.cliente,
      monto: parseFloat(formData.monto),
      fecha: new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' }),
      estado: 'generado'
    };

    setDocuments([newDoc, ...documents]);
    setFormData({ tipo: '', pedido: '', cliente: '', monto: '' });
    setGenerating(false);
    toast.success('Documento generado exitosamente');
  };

  const handleDownload = (doc: Document) => {
    toast.success(`Descargando ${getTipoText(doc.tipo)} ${doc.numero}...`);
  };

  const handleSend = (doc: Document) => {
    setDocuments(documents.map(d =>
      d.id === doc.id ? { ...d, estado: 'enviado' } : d
    ));
    toast.success(`${getTipoText(doc.tipo)} enviado al cliente`);
  };

  const getTipoText = (tipo: string) => {
    const tipos = {
      'factura': 'Factura Electrónica',
      'guia': 'Guía de Despacho',
      'recibo': 'Recibo'
    };
    return tipos[tipo as keyof typeof tipos];
  };

  const getTipoIcon = (tipo: string) => {
    return <FileText className="w-5 h-5" />;
  };

  const getEstadoBadge = (estado: string) => {
    const badges = {
      'generado': 'bg-yellow-100 text-yellow-800',
      'enviado': 'bg-blue-100 text-blue-800',
      'pagado': 'bg-green-100 text-green-800'
    };
    return badges[estado as keyof typeof badges];
  };

  const getEstadoText = (estado: string) => {
    const text = {
      'generado': 'Generado',
      'enviado': 'Enviado',
      'pagado': 'Pagado'
    };
    return text[estado as keyof typeof text];
  };

  const stats = {
    total: documents.length,
    generados: documents.filter(d => d.estado === 'generado').length,
    enviados: documents.filter(d => d.estado === 'enviado').length,
    pagados: documents.filter(d => d.estado === 'pagado').length
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        <div>
          <h1 className="mb-2">Emisión de Documentos</h1>
          <p className="text-gray-600">Generación automática de facturas y guías de despacho electrónicas</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-8 h-8 text-blue-600" />
                <span className="text-2xl">{stats.total}</span>
              </div>
              <p className="text-gray-600">Total Documentos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-8 h-8 text-yellow-600" />
                <span className="text-2xl">{stats.generados}</span>
              </div>
              <p className="text-gray-600">Generados</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Send className="w-8 h-8 text-blue-600" />
                <span className="text-2xl">{stats.enviados}</span>
              </div>
              <p className="text-gray-600">Enviados</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-2xl">{stats.pagados}</span>
              </div>
              <p className="text-gray-600">Pagados</p>
            </CardContent>
          </Card>
        </div>

        {/* Document Generator */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Generar Nuevo Documento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label>Tipo de Documento</Label>
                <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="factura">Factura Electrónica</SelectItem>
                    <SelectItem value="guia">Guía de Despacho</SelectItem>
                    <SelectItem value="recibo">Recibo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Pedido Asociado</Label>
                <Input
                  value={formData.pedido}
                  onChange={(e) => setFormData({ ...formData, pedido: e.target.value })}
                  placeholder="TT12345"
                  className="bg-white"
                />
              </div>
              <div>
                <Label>Cliente</Label>
                <Input
                  value={formData.cliente}
                  onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                  placeholder="Nombre del cliente"
                  className="bg-white"
                />
              </div>
              <div>
                <Label>Monto</Label>
                <Input
                  type="number"
                  value={formData.monto}
                  onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                  placeholder="0"
                  className="bg-white"
                />
              </div>
            </div>
            <div className="mt-4">
              <Button
                onClick={handleGenerate}
                disabled={generating}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {generating ? 'Generando...' : 'Generar Documento'}
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Los documentos se generan automáticamente con firma electrónica y son enviados al SII
            </p>
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle>Documentos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          {getTipoIcon(doc.tipo)}
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1">{getTipoText(doc.tipo)}</h4>
                          <p className="text-sm text-gray-600">
                            {doc.numero} - {doc.cliente}
                          </p>
                        </div>
                        <div className="text-right hidden md:block">
                          <p className="mb-1">${doc.monto.toLocaleString('es-CL')}</p>
                          <p className="text-sm text-gray-600">{doc.fecha}</p>
                        </div>
                        <div className="hidden md:block">
                          <span className={`px-3 py-1 rounded-full text-sm ${getEstadoBadge(doc.estado)}`}>
                            {getEstadoText(doc.estado)}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="ghost" size="sm" onClick={() => handleDownload(doc)}>
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {doc.estado === 'generado' && (
                          <Button variant="ghost" size="sm" onClick={() => handleSend(doc)}>
                            <Send className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-green-900 mb-2">Sistema de Facturación Electrónica</h4>
                <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                  <li>Documentos Tributarios Electrónicos (DTE) certificados por el SII</li>
                  <li>Firma electrónica automática</li>
                  <li>Envío automático al cliente y al SII</li>
                  <li>Respaldo en la nube con encriptación</li>
                  <li>Cumplimiento normativo garantizado</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StaffLayout>
  );
}
