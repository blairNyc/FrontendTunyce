import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';

interface ImageUploadProps { }

const ImageUpload: React.FC<ImageUploadProps> = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];

        const formData = new FormData();
        formData.append('image', file);

        try {
            // Replace YOUR_ENDPOINT_HERE with the actual endpoint URL
            const response = await axios.post<{ imageUrl: string }>('https://media.tunycemedia.com/upload/advert', formData);

            // Assuming the response contains the image URL
            const { imageUrl } = response.data;

            setImageUrl(imageUrl);
            console.log('Image uploaded successfully. URL:', imageUrl);
        } catch (error : any) {
            console.error('Error uploading image:', error.message);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*' as any,
        onDrop,
    });

    return (
        <div className="container mx-auto mt-8">
            <div {...getRootProps()} className={dropzoneStyle(isDragActive)}>
                <input {...getInputProps()} />
                <p className="text-lg text-gray-600">
                    {isDragActive
                        ? 'Drop the image here...'
                        : 'Drag \'n\' drop an image here, or click to select one'}
                </p>
            </div>
            {imageUrl && (
                <div className="mt-4">
                    <p className="text-lg text-gray-800">Uploaded Image:</p>
                    <img src={imageUrl} alt="Uploaded" className="mt-2 max-w-full h-auto" />
                </div>
            )}
        </div>
    );
};

const dropzoneStyle = (isDragActive: boolean) => `
  border-2 ${isDragActive ? 'border-green-500' : 'border-gray-300'} 
  border-dashed rounded p-8 text-center cursor-pointer`;

export default ImageUpload;
