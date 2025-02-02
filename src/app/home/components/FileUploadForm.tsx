'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { uploadFile } from '@/app/actions/uploadFile';

export default function FileUploadForm() {
  const [hostName, setHostName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (selectedFile && hostName) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('hostName', hostName);
      await uploadFile(formData);
      setUploading(false);
      setHostName('');
      setSelectedFile(null);
    }
  };

  return (
    <div className='mb-8'>
      <input
        type='text'
        placeholder='Enter Host Name'
        value={hostName}
        onChange={(e) => setHostName(e.target.value)}
        className='w-full p-2 mb-4 border rounded'
      />
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <FiUpload className='mx-auto text-4xl mb-2' />
        <p>
          {isDragActive
            ? 'Drop the file here'
            : 'Drag & drop a file here, or click to select a file'}
        </p>
      </div>
      {selectedFile && (
        <div className='mt-4'>
          <p className='text-sm text-gray-600'>
            Selected file: {selectedFile.name}
          </p>
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || !hostName || uploading}
        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed'
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}
