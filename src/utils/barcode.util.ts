import * as bwipjs from 'bwip-js';

export async function generateBarcodeBase64(text: string): Promise<string> {
  const pngBuffer = await bwipjs.toBuffer({
    bcid: 'code128',
    text,
    scale: 3,
    height: 10,
    includetext: true,
    textxalign: 'center',
  });
  return `data:image/png;base64,${pngBuffer.toString('base64')}`;
}
