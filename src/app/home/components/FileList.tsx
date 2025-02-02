import { FiDownload } from 'react-icons/fi';
import { getUploadedFiles } from '@/app/actions/getUploadedFiles';

export default async function FileList() {
  const files = await getUploadedFiles();

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Uploaded Files</h2>
      <ul className='space-y-2'>
        {files.map((file: any) => (
          <li
            key={file.id}
            className='flex items-center justify-between bg-gray-100 p-4 rounded'
          >
            <div>
              <p className='font-medium'>{file.name}</p>
              <p className='text-sm text-gray-600'>Host: {file.hostName}</p>
            </div>
            <a
              href={`/api/download/${file.id}`}
              download
              className='flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              <FiDownload className='mr-2' />
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
