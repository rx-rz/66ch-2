import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Editor } from "src/components/Elements/Editor/Editor";
import { Form } from "src/components/Elements/Form/Form";
import { TextAreaField } from "src/components/Elements/Form/TextAreaField";
import { auth, database } from "src/utils/firebaseConfig";

type PostSettingProps = {
  tag: string | undefined;
  description: string | undefined;
  imageUrl: string | undefined;
};

const date = new Date();

export default function PostContent({
  tag,
  description,
  imageUrl,
}: PostSettingProps) {
  const [editorContent, setEditorContent] = useState("");

  const postsRef = collection(database, "posts");
  type EditorProps = {
    postTitle: string;
  };

  const [user] = useAuthState(auth);

  //passing a setter function down to the editor component to monitor
  //its values.

  const handleSubmit = async (data: EditorProps) => {
    await addDoc(postsRef, {
      postTitle: data.postTitle,
      postContent: editorContent,
      imageDownloadUrl: imageUrl,
      author: { name: user?.displayName, id: user?.uid },
      dateCreated: date.toLocaleDateString(),
      tag: tag,
      description: description,
    });
    console.log("done")
  };

  const changeEditorContent = (editorContent: string) => {
    setEditorContent(editorContent);
  };
  return (
    <div className="w-11/12 mx-auto">
      <Form onSubmit={handleSubmit}>
        {({ register, formState }) => (
          <>
            <TextAreaField
              error={formState.errors.postTitle}
              placeholder="Enter your post title here..."
              registration={register("postTitle")}
              className="resize-none focus:outline-none w-11/12 m-auto"
            />
            <Editor handleContentChange={changeEditorContent} />
            <button type="submit">Submit</button>
          </>
        )}
      </Form>
    </div>
  );
}
