import FileUploadForm from './components/FileUploadForm';
import FileList from './components/FileList';

export default function Home() {
  return (
    <main className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>File Upload and Download</h1>
      <FileUploadForm />
      <FileList />
    </main>
  );
}
