'use server';

import { readFile } from 'fs/promises';
import { join } from 'path';

export async function getUploadedFiles() {
  const filesJson = join(process.cwd(), 'files.json');
  const files = JSON.parse(await readFile(filesJson, 'utf-8'));
  return files;
}
