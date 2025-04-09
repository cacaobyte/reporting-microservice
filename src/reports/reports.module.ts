import { Module } from '@nestjs/common';
import { ReportsController } from '../controllers/reports.controller';
import { PdfService } from '../service/pdf.service';
import { TemplateService } from '../service/template.service';

@Module({
  controllers: [ReportsController],
  providers: [PdfService, TemplateService],
})
export class ReportsModule {}
