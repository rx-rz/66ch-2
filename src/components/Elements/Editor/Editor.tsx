import  { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type EditorProps = {
    handleContentChange: (value: string) => void
    draftContent: string | undefined 
};

export const Editor = ({handleContentChange, draftContent}: EditorProps) => {
  const draftValue = draftContent ?? ""
  const [value, setValue] = useState(draftValue);
  const [draftValueAdded, setDraftValueAdded] = useState(false)
  

  useEffect(() => {
    handleContentChange(value)
    if(draftValue && !draftValueAdded){
      setValue(draftValue)
      setDraftValueAdded(true)
    }
  }, [value, handleContentChange, draftValue, draftValueAdded])

    
  return (
    <>
    <ReactQuill
      
      theme="snow"
      placeholder="Enter your post content here"
      value={value}
      onChange={setValue}
      className="w-full"
    />
    </>
  );
};
