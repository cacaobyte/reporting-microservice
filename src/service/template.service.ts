import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as Handlebars from 'handlebars';

@Injectable()
export class TemplateService {
  async renderTemplate(templateName: string, data: any): Promise<string> {
    // Corrección: usar process.cwd() para asegurar que lea desde src/
    const filePath = path.join(process.cwd(), 'src', 'reports', 'templates', templateName);
    const html = await fs.readFile(filePath, 'utf8');
    const template = Handlebars.compile(html);
    return template(data);
  }
}
