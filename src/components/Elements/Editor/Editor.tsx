
import  { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


type EditorProps = {
    handleContentChange: (value: string) => void
};

export const Editor = ({handleContentChange}: EditorProps) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    handleContentChange(value)
  }, [value, handleContentChange])

    
  return (
    <>
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      className="w-full"
    />
    </>
  );
};
