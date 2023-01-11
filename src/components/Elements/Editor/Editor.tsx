import {
  getDownloadURL,
  ref,
  StorageError,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { storage } from "src/config/firebaseConfig";

type EditorProps = {
  handleContentChange: (value: string) => void;
  draftContent: string | undefined;
};

export const Editor = ({ handleContentChange, draftContent }: EditorProps) => {
  const draftValue = draftContent ?? "";
  const quill = useRef<ReactQuill | any>();
  const [value, setValue] = useState(draftValue);
  const [draftValueAdded, setDraftValueAdded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<StorageError | null>(null);

  // Function for uploading images to firebase storage
  const uploadImageToServer = (file: File) => {
    // Accessing the Quill editor instance
    const editor = quill.current?.getEditor();
    // Creating a storage reference for the file
    const storageRef = ref(storage, `images/${file.name}`);
    // Starting an upload task using the uploadBytesResumable function
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Adding event listeners to the upload task
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Updating progress state as the upload progresses
        let percentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percentage);
      },
      (err) => {
        // Updating error state if an error occurs
        setError(err);
      },
      async () => {
        // Retrieving the download URL of the uploaded file
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Inserting the image into the Quill editor using the download URL
          editor?.insertEmbed(editor.getSelection(), "image", downloadURL);
        });
      }
    );
  };

  // Function for handling image uploads
  const imageHandler = async () => {
    // Creating an input element
    const input = document.createElement("input");
    // Setting the type of the input element to 'file'
    input.setAttribute("type", "file");
    // Trigging click event on the input element to open the file dialog
    input.click();
    // Adding an onchange event listener to the input element
    input.onchange = () => {
      // Accessing the selected file
      const file = input.files![0];
      // Creating a new FormData object
      const formData = new FormData();
      // Appending the selected file to the FormData object
      formData.append("image", file);
      // Calling the uploadImageToServer function with the selected file as an argument
      uploadImageToServer(file);
    };
  };

  // Setting the Quill editor modules
  const modules = useMemo(
    () => ({
      toolbar: {
        // Defining the layout of the toolbar
        container: [
          // First row of the toolbar
          [{ header: [1, 2, false] }],
          // Second row of the toolbar
          ["bold", "italic", "underline"],
          // Third row of the toolbar
          [{ script: "sub" }, { script: "super" }],
          // Fourth row of the toolbar
          [{ list: "ordered" }, { list: "bullet" }],
          // Fifth row of the toolbar
          ["link", "image", "blockquote"],
        ],
        // Defining the handlers for the toolbar buttons
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  useEffect(() => {
    // calling the handleContentChange function with the current value as an argument
    handleContentChange(value);
    // check if draftValue exists and has not yet been added
    if (draftValue && !draftValueAdded) {
      // Updating the value with the draft value
      setValue(draftValue);
      // marking draftValue as added
      setDraftValueAdded(true);
    }
  }, [value, handleContentChange, draftValue, draftValueAdded]);

  return (
    <>
      <ReactQuill
        modules={modules}
        ref={quill}
        theme="snow"
        value={value}
        placeholder="Enter your post content here"
        onChange={setValue}
        className="w-full"
      />
    </>
  );
};
