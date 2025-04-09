import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as Handlebars from 'handlebars';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class PdfService {
  async generatePdf(templateName: string, data: any): Promise<Buffer> {
    const filePath = path.join(process.cwd(), 'src', 'reports', 'templates', templateName);
    const htmlRaw = await fs.readFile(filePath, 'utf-8');
    const template = Handlebars.compile(htmlRaw);
    const html = template(data);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    return Buffer.from(pdf);
  }
}
