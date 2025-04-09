import * as QRCode from 'qrcode';

export async function generateQRBase64(text: string): Promise<string> {
  return await QRCode.toDataURL(text);
}
