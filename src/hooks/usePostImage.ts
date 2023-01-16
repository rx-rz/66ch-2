import {
  getDownloadURL,
  ref,
  StorageError,
  uploadBytesResumable,
} from "firebase/storage";
import { useState, useEffect } from "react";
import { storage } from "src/config/firebaseConfig";
export const usePostImage = (file: File) => {
  const [progress, setProgres] = useState(0);
  const [error, setError] = useState<StorageError | null>(null);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    // check if the file variable exists
    if (file) {
      // Create a reference to the images folder in the storage and include the file name
      const storageRef = ref(storage, `images/${file.name}`);
      // Use the uploadBytesResumable function to upload the file to the storageRef
      const uploadTask = uploadBytesResumable(storageRef, file);
      // listen to the state_changed event of the uploadTask
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // calculate the percentage of upload
          let percentage = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // set the progress state with the percentage
          setProgres(percentage);
        },
        // Error callback
        (err) => {
          setError(err);
        },
        // Success callback
        async () => {
          // get the download URL from the uploadTask's snapshot reference and set the url state
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
          });
        }
      );
    }
  }, [file]);

  return { progress, url, error };
};
