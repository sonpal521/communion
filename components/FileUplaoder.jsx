'use client';

import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from '@uploadthing/react';
import { Button } from '@/components/ui/button';

function FileUploader  ({ imageUrl, onFieldChange, setFiles }) {
  const [previewUrl, setPreviewUrl] = useState(imageUrl);

  // Cleanup function to revoke old object URLs
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Function to handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const objectUrl = URL.createObjectURL(file);

      // Revoke previous object URL
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      // Update states
      setPreviewUrl(objectUrl);
      setFiles(acceptedFiles);
      onFieldChange(objectUrl);
    }
  }, [setFiles, onFieldChange, previewUrl]);

  // Initialize dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }, // Corrected accept format
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-60 cursor-pointer flex-col overflow-hidden  bg-grey-100"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {previewUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <img
            src={previewUrl}
            alt="Uploaded preview"
            width={250}
            height={150}
            className="w-full object-cover object-center rounded-md"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex  border-2 bg-gray-100 border-gray-300  rounded-md items-center flex-col py-5 text-grey-500">
          <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload icon" />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">Select from computer</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
