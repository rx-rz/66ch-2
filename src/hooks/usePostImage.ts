import { getDownloadURL, ref, StorageError, uploadBytesResumable } from "firebase/storage";
import { useState, useEffect } from "react";
import { storage } from "src/utils/firebaseConfig";
export const usePostImage = (file: File) => {
  const [progress, setProgres] = useState(0);
  const [error, setError] = useState<StorageError | null>(null);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", (snapshot) => {
        let percentage =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgres(percentage)
      },
      (err) => {setError(err)},
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL)
        })
      });
    }
  }, [file]);

  return {progress, url, error}
};