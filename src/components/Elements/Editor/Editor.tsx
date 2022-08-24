import { async } from "@firebase/util";
import {
  getDownloadURL,
  ref,
  StorageError,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { storage } from "src/config/firebaseConfig";

type EditorProps = {
  handleContentChange: (value: string) => void;
  draftContent: string | undefined;
};

export const Editor = ({ handleContentChange, draftContent }: EditorProps) => {
  const draftValue = draftContent ?? "";
  const quill = useRef<any>();
  const [value, setValue] = useState(draftValue);
  const [draftValueAdded, setDraftValueAdded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<StorageError | null>(null);


  const uploadImageToServer = (file: File) => {
    const editor = quill.current.getEditor();
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let percentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          editor.insertEmbed(editor.getSelection(), "image", downloadURL);
        });
      }
    );
  };

  const imageHandler = async () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.click();
    input.onchange = () => {
      const file = input.files![0];
      const formData = new FormData();
      formData.append("image", file);
      uploadImageToServer(file);
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["image", "code-block"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  useEffect(() => {
    handleContentChange(value);
    if (draftValue && !draftValueAdded) {
      setValue(draftValue);
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
        defaultValue={"Enter your post content here"}
        onChange={setValue}
        className="w-full"
      />
    </>
  );
};
