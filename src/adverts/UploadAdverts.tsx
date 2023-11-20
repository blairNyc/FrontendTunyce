// FileUploadComponent.tsx
import React, { useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';



const UploadAdverts: React.FC = () => {







  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    
    console.log('File uploaded successfully:');
    const file = acceptedFiles[0];

    try {
      const response = await axios.post('YOUR_CLOUDFLARE_UPLOAD_URL', file, {
        headers: {
          'Content-Type': file.type,
          'X-Auth-Key': 'YOUR_CLOUDFLARE_AUTH_KEY',
          'X-Auth-Email': 'YOUR_CLOUDFLARE_AUTH_EMAIL',
        },
      });

      // Handle the Cloudflare upload success
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      // Handle upload error
      console.error('Error uploading file to Cloudflare:', error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default UploadAdverts;
