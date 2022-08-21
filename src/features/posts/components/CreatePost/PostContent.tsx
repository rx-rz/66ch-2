import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { draftToast, errorToast, postContentToast } from "../../api/createPost";
import { Link, useParams } from "react-router-dom";
import { Button, Editor, Form, TextAreaField } from "src/components";
import { useUserContext } from "src/context/userContext";
import { database } from "src/config/firebaseConfig";

export type Blog = {
  author: { name: string; id: string };
  tag: string;
  id: string;
  postContent: string;
  imageDownloadUrl: string;
  postTitle: string;
  ref: DocumentReference<DocumentData>;
  dateCreated: string;
  description: string;
  status: string,
  isChecked: boolean

};

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
  const { user } = useUserContext()!;
  const postsRef = collection(database, "posts");
  const draftsRef = collection(database, "drafts");
  const { id } = useParams();
  const [draftId, setDraftId] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState("");

  const changeEditorContent = (editorContent: string) => {
    setEditorContent(editorContent);
  };

  const handleSubmit = async (data: EditorProps) => {
    if (/[a-z]/i.test(data.postTitle) && /[a-z]/i.test(editorContent)) {
      if (imageUrl && tag && description) {
        await addDoc(postsRef, {
          postTitle: data.postTitle,
          postContent: editorContent,
          imageDownloadUrl: imageUrl ?? draft?.imageDownloadUrl,
          author: { name: user?.name, id: user?.uid },
          dateCreated: date.toLocaleDateString(),
          tag: tag,
          description: description,
          status: user && user.role === "admin" ? "approved" : "pending",
        });
        if (draft) {
          await deleteDoc(doc(database, "drafts", id!));
        }
        window.location.pathname = "/";
      } else {
        errorToast();
      }
    } else {
      postContentToast();
    }
  };

  const handleDraft = async () => {
    if (!draft) {
      if (!draftId) {
        await addDoc(draftsRef, {
          postContent: editorContent ?? "",
          imageDownloadUrl: imageUrl ?? "",
          author: { name: user?.name, id: user?.uid },
          dateCreated: date.toLocaleDateString(),
          tag: tag ?? "",
          description: description ?? "",
        }).then((docRef) => setDraftId(docRef.id));
        draftToast();
      } else {
        await updateDoc(doc(database, "drafts", draftId!), {
          postContent: editorContent ?? "",
          imageDownloadUrl: imageUrl ?? "",
          author: { name: user?.name, id: user?.uid },
          dateCreated: date.toLocaleDateString(),
          tag: tag ?? "",
          description: description ?? "",
        });
        draftToast();
      }
    } else {
      await updateDoc(doc(database, "drafts", id!), {
        postContent: editorContent ?? "",
        imageDownloadUrl: imageUrl ?? draft.imageDownloadUrl ?? "",
        author: { name: user?.name, id: user?.uid },
        dateCreated: date.toLocaleDateString(),
        tag: tag ?? "",
        description: description ?? "",
      });
      draftToast();
    }
  };

  return (
    <div className="w-11/12 mx-auto my-12 font-albertsans">
      <nav className="flex justify-between mx-auto">
        <Link to="/" className="md:text-xl text-md font-bold">
          {" "}
          &#8592; Home
        </Link>
        <div className="justify-between flex">
          <Button
            className="border border-tertiary px-1 md:text-xl text-md"
            handleClick={handleDraft}
          >
            Save As Draft
          </Button>
          <Button
            className="border bg-tertiary  border-tertiary text-primary px-1 md:text-xl text-md md:hidden ml-3"
            handleClick={handleMenuToggle}
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
              className="resize-none focus:outline-none w-full m-auto text-3xl md:text-4xl lg:text-5xl ml-1 bg-primary text-tertiary "
            />
            {!imageUrl && !description && !tag && (
              <p className="md:text-xl md:mt-8 mt-4">
                Please specify the needed settings for the blog post in the post
                settings
              </p>
            )}

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
