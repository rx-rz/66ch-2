import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useParams } from "react-router-dom";
import { Button } from "src/components/Elements/Button/Button";
import { Editor } from "src/components/Elements/Editor/Editor";
import { Form } from "src/components/Elements/Form/Form";
import { TextAreaField } from "src/components/Elements/Form/TextAreaField";
import { auth, database } from "src/utils/firebaseConfig";
import { Blog } from "../../api/postConverter";

type PostSettingProps = {
  tag: string | undefined;
  description: string | undefined;
  imageUrl: string | undefined;
  handleMenuToggle: () => void;
  draft?: Partial<Blog>;
};
const date = new Date();
type EditorProps = {
  postTitle: string;
};

export const PostContent = ({
  tag,
  description,
  imageUrl,
  handleMenuToggle,
  draft,
}: PostSettingProps) => {
  const { id } = useParams();
  const postsRef = collection(database, "posts");
  const [user] = useAuthState(auth);
  const [editorContent, setEditorContent] = useState("");
  const [postTitleForDraft, setPostTitleForDraft] = useState("");
  const postTitleRef = useRef<HTMLTextAreaElement | null>(null);
  const [draftClicked, setDraftClicked] = useState(false);
  
  const handleSubmit = async (data: EditorProps) => {
    await addDoc(postsRef, {
      postTitle: data.postTitle,
      postContent: editorContent,
      imageDownloadUrl: imageUrl,
      author: { name: user?.displayName, id: user?.uid },
      dateCreated: date.toLocaleDateString(),
      tag: tag,
      description: description,
      isDraft: false,
    });
    window.location.pathname = "/";
  };

  const handleDraft = async () => {
    if (!draft) {
      await addDoc(postsRef, {
        postTitle: postTitleForDraft ?? "",
        postContent: editorContent ?? "",
        imageDownloadUrl: imageUrl ?? "",
        author: { name: user?.displayName, id: user?.uid },
        dateCreated: date.toLocaleDateString(),
        tag: tag ?? "",
        description: description ?? "",
        isDraft: true,
      });
    } else {
      await updateDoc(doc(database, "posts", id!), {
        postTitle: postTitleForDraft ?? "",
        imageDownloadUrl: imageUrl ?? "",
        author: { name: user?.displayName, id: user?.uid },
        dateCreated: date.toLocaleDateString(),
        tag: tag ?? "",
        description: description ?? "",
        isDraft: true,
      });
    }
  };

  const changeEditorContent = (editorContent: string) => {
    setEditorContent(editorContent);
  };
  return (
    <div className="w-11/12 mx-auto my-12">
      <nav className="flex justify-between mx-auto">
        <Link to="/" className="text-xl font-bold">
          &#8592; Home
        </Link>
        <div className="justify-between flex max-w-6xl ">
          <Button
            className="border border-black px-1 md:text-xl "
            handleClick={handleDraft}
          >
            Save As Draft
          </Button>
          <Button
            handleClick={handleMenuToggle}
            className="border border-black px-1 bg-black text-white md:text-xl md:hidden ml-3"
          >
            Settings
          </Button>
        </div>
      </nav>
      <Form onSubmit={handleSubmit}>
        {({ register, formState, setValue }) => (
          <>
            {draft && setValue("postTitle", `${draft.postTitle}`)}
            <TextAreaField
              error={formState.errors.postTitle}
              onChange={(e: any) => setPostTitleForDraft(e.target.value)}
              placeholder="Enter your post title here..."
              registration={register("postTitle")}
              className="resize-none focus:outline-none w-11/12 m-auto text-2xl md:text-4xl lg:text-6xl ml-1 bg-primary text-tertiary"
            />

            {imageUrl && (
              <img
                src={imageUrl}
                alt={description}
                className="w-full object-cover"
              />
            )}
            {/* {draft && (
              <img
                src={draft.imageDownloadUrl}
                alt={description}
                className="w-full object-cover"
              />
            )} */}
            <Editor
              handleContentChange={changeEditorContent}
              draftContent={draft?.postContent}
            />
            <Button
              type="submit"
              className="text-xl font-Synonym lg:w-5/12 w-full border border-tertiary bg-tertiary text-primary p-1 py-2 text-center lg:mt-0 mt-6 transition-opacity duration-300  hover:opacity-80"
            >
              Create Post
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};
