import { readFile } from 'fs/promises';
import { join } from 'path';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const filesJson = join(process.cwd(), 'files.json');
  const files = JSON.parse(await readFile(filesJson, 'utf-8'));
  const file = files.find((f: any) => f.id === id);

  if (!file) {
    return new NextResponse('File not found', { status: 404 });
  }

  const fileBuffer = await readFile(file.path);
  const headers = new Headers();
  headers.set('Content-Disposition', `attachment; filename="${file.name}"`);
  headers.set('Content-Type', 'application/octet-stream');

  return new NextResponse(fileBuffer, { headers });
}
