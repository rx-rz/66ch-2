import { useState } from "react";
import { Editor } from "src/components/Elements/Editor/Editor";
import { Form } from "src/components/Elements/Form/Form";
import { InputField } from "src/components/Elements/Form/InputField";

export default function PostDetails() {
    const [editorContent, setEditorContent] = useState("")
    
    //passing a setter function down to the editor component to monitor
    //its values.

    const changeEditorContent = (editorContent: string) => {
        setEditorContent(editorContent)
    }
  return (
    <Form onSubmit={(data) => console.log(editorContent)}>
      {({ register, formState }) => (
        <>
          <InputField
            // error={formState.errors.postTitle}
            registration={register("postTitle")}
            label="Post Title"
            type="text"
          />
          <Editor handleContentChange={changeEditorContent}/>
          <button type="submit">Submit</button>
        </>
      )}
    </Form>
  );
}
