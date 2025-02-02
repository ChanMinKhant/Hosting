'use server';

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;
  const hostName = formData.get('hostName') as string;

  if (!file || !hostName) {
    throw new Error('File and host name are required');
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name;
  const id = uuidv4();
  const uploadDir = join(process.cwd(), 'uploads');
  const filePath = join(uploadDir, id);

  await writeFile(filePath, buffer);

  // In a real application, you'd want to store this information in a database
  const fileInfo = { id, name: filename, hostName, path: filePath };
  const filesJson = join(process.cwd(), 'files.json');
  const existingFiles = JSON.parse(await readFile(filesJson, 'utf-8'));
  existingFiles.push(fileInfo);
  await writeFile(filesJson, JSON.stringify(existingFiles, null, 2));

  return { success: true };
}
