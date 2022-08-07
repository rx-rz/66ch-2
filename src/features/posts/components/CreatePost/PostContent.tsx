import { useState } from "react";
import { Editor } from "src/components/Elements/Editor/Editor";
import { Form } from "src/components/Elements/Form/Form";
import { TextAreaField } from "src/components/Elements/Form/TextAreaField";

export default function PostContent() {
  const [editorContent, setEditorContent] = useState("");

  type EditorProps = {
    postTitle: string;
  };

  //passing a setter function down to the editor component to monitor
  //its values.

  const changeEditorContent = (editorContent: string) => {
    setEditorContent(editorContent);
  };
  return (
    <div className="w-11/12 mx-auto">
      <Form onSubmit={(data: EditorProps) => console.log(editorContent)}>
        {({ register, formState }) => (
          <>
            <TextAreaField
              error={formState.errors.postTitle}
              placeholder="Enter your post title here..."
              registration={register("postTitle")}
              className="w-full resize-none focus:outline-none ml-3"
            />
            <Editor handleContentChange={changeEditorContent} />
            <button type="submit">Submit</button>
          </>
        )}
      </Form>
    </div>
  );
}
