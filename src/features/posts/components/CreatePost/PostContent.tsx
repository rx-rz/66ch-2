import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
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
const errorToast = () =>
  toast.error(
    "Specify a blog image, tag and description in the post settings",
    {
      style: {
        borderRadius: 0,
        color: "#2F3630",
        backgroundColor: "#EEECE7",
        border: "1px solid #2F3630",
        width: "300px",
      },
      duration: 4000,
    }
  );

const draftToast = () =>
  toast.success("Draft saved. Check your profile to view drafts.", {
    style: {
      borderRadius: 0,
      color: "#2F3630",
      backgroundColor: "#EEECE7",
      border: "1px solid #2F3630",
      width: "300px",
    },
    duration: 4000,
  });

export const PostContent = ({
  tag,
  description,
  imageUrl,
  handleMenuToggle,
  draft,
}: PostSettingProps) => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const postsRef = collection(database, "posts");
  const [postId, setPostId] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState("");

  const changeEditorContent = (editorContent: string) => {
    setEditorContent(editorContent);
  };

  const handleSubmit = async (data: EditorProps) => {
    if (imageUrl && tag && description) {
      if (!draft) {
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
      } else {
        await updateDoc(doc(database, "posts", id!), {
          postTitle: data.postTitle,
          postContent: editorContent,
          imageDownloadUrl: imageUrl ?? draft?.imageDownloadUrl,
          author: { name: user?.displayName, id: user?.uid },
          dateCreated: date.toLocaleDateString(),
          tag: tag ?? "",
          description: description ?? "",
          isDraft: false,
        });
      }
      window.location.pathname = "/";
    } else {
      errorToast();
    }
  };

  const handleDraft = async () => {
    if (!draft) {
      if (!postId) {
        await addDoc(postsRef, {
          postContent: editorContent ?? "",
          imageDownloadUrl: imageUrl ?? "",
          author: { name: user?.displayName, id: user?.uid },
          dateCreated: date.toLocaleDateString(),
          tag: tag ?? "",
          description: description ?? "",
          isDraft: true,
        }).then((docRef) => setPostId(docRef.id));
        draftToast();
      } else {
        await updateDoc(doc(database, "posts", postId!), {
          postContent: editorContent ?? "",
          imageDownloadUrl: imageUrl ?? "",
          author: { name: user?.displayName, id: user?.uid },
          dateCreated: date.toLocaleDateString(),
          tag: tag ?? "",
          description: description ?? "",
          isDraft: true,
        });
        draftToast();
      }
    } else {
      await updateDoc(doc(database, "posts", id!), {
        postContent: editorContent ?? "",
        imageDownloadUrl: imageUrl ?? draft.imageDownloadUrl ?? "",
        author: { name: user?.displayName, id: user?.uid },
        dateCreated: date.toLocaleDateString(),
        tag: tag ?? "",
        description: description ?? "",
        isDraft: true,
      });
      draftToast();
    }
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

      <Form onSubmit={handleSubmit} options={{ mode: "onBlur" }}>
        {({ register, formState }) => (
          <>
            <TextAreaField
              error={formState.errors.postTitle}
              placeholder="Enter your post title here...(200 characters max)"
              registration={register("postTitle", {
                required: "Please enter a post title",
                maxLength: {
                  value: 200,
                  message:
                    "Your post title cannot be more than 200 characters long",
                },
              })}
              className="resize-none focus:outline-none w-11/12 m-auto text-2xl md:text-4xl lg:text-6xl ml-1 bg-primary text-tertiary border"
            />

            {imageUrl ? (
              <img
                src={imageUrl}
                alt={description}
                className="w-full object-cover"
              />
            ) : (
              <img
                src={draft?.imageDownloadUrl}
                alt={description}
                className="w-full object-cover"
              />
            )}
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
