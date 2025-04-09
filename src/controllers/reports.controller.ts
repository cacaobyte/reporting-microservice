import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TemplateService } from '../service/template.service';
import { PdfService } from '../service/pdf.service';
import { generateQRBase64 } from '../utils/qr.util';
import { generateBarcodeBase64 } from '../utils/barcode.util';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly templateService: TemplateService,
    private readonly pdfService: PdfService,
  ) {}

  // ✅ 1. DEMO desde el navegador con datos fijos
  @Get('preview/payroll')
  async previewPayrollDemo(@Res() res: Response) {
    const empleadoId = 'EMP-001';
    const qrImage = await generateQRBase64(empleadoId);
    const barcodeImage = await generateBarcodeBase64(empleadoId);

    const data = {
      nombre: 'Juan Pérez',
      puesto: 'Vendedor',
      salario: '$4500',
      fecha: new Date().toLocaleDateString('es-ES'),
      foto: 'https://i.pravatar.cc/150?img=1',
      logo: 'https://i.pravatar.cc/150?img=5',
      qrImage,
      barcodeImage,
      codigoEmpleado: empleadoId,
      departamento: 'Ventas',
      fechaIngreso: '10/01/2021',
      metodoPago: 'Transferencia Bancaria',
      deducciones: '$250',
      totalPagar: '$4250',
    };

    const html = await this.templateService.renderTemplate('payroll.hbs', data);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }

  // ✅ 2. POST real desde frontend o cliente HTTP
  @Post('preview/payroll')
  async previewPayroll(@Body() body: any, @Res() res: Response) {
    const empleadoId = body?.codigoEmpleado ?? 'EMP-001';
    const qrImage = await generateQRBase64(empleadoId);
    const barcodeImage = await generateBarcodeBase64(empleadoId);

    const data = {
      nombre: body.nombre || 'Empleado Genérico',
      puesto: body.puesto || 'Sin puesto',
      salario: body.salario || '$0',
      fecha: body.fecha || new Date().toLocaleDateString('es-ES'),
      foto: body.foto || 'https://i.pravatar.cc/150?img=3',
      logo: body.logo || 'https://upload.wikimedia.org/wikipedia/commons/9/98/International_Paper_Company_logo.svg',
      qrImage,
      barcodeImage,
      codigoEmpleado: empleadoId,
      departamento: body.departamento || 'General',
      fechaIngreso: body.fechaIngreso || '01/01/2020',
      metodoPago: body.metodoPago || 'No especificado',
      deducciones: body.deducciones || '$0',
      totalPagar: body.totalPagar || body.salario || '$0',
    };

    const html = await this.templateService.renderTemplate('payroll.hbs', data);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }

  // (Opcional) También puedes dejar el POST /generate/payroll para PDF aquí
}
