import { useState } from "react";
import imageCompression from "browser-image-compression";
import { useEffect } from "react";

const useOptimizeImage = (image: File) => {
  const [imageFile, setImageFile] = <File | any>useState({} as File);
  const [error, setError] = useState<Error | null>();
  try {
    // Use the useEffect hook to handle the image upload process
    useEffect(() => {
      async function handleImageUpload() {
        // Assign the image variable to imageFile
        const imageFile = image;
        // Options object for image compression
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        try {
          // Compress the image using the imageCompression function and the options
          const compressedFile = await imageCompression(imageFile, options);
          // Create a new File object with the compressed image and the original image's name
          const file = new File([compressedFile], image.name);
          // Set the imageFile state
          setImageFile(file);
        } catch (error: any) {
          // set the error state with the error message
          setError(error.message);
        }
      }
      // invoke the handleImageUpload function on component mount
      handleImageUpload();
    }, [image]);
  } catch (err: any) {
    // set the error state with the error message
    setError(err.message);
  }

  return { imageFile, error };
};

export default useOptimizeImage;
