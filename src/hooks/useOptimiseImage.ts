import { useState } from "react";
import imageCompression from "browser-image-compression";
import { useEffect } from "react";

const useOptimizeImage = (image: File) => {
  const [imageFile, setImageFile] = <File | any>useState({} as File);
  const [error, setError] = useState<Error | null>();
  try {
    useEffect(() => {
      async function handleImageUpload() {
        const imageFile = image;
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(imageFile, options);
          const file = new File([compressedFile], image.name);
          setImageFile(file);
        } catch (error: any) {
          setError(error.message);
        }
      }
      handleImageUpload();
    }, [image]);
  } catch (err: any) {
    setError(err.message);
  }

  return { imageFile, error };
};

export default useOptimizeImage;
