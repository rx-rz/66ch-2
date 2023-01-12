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
import { useDocumentData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { database } from "src/config/firebaseConfig";
import { useUserContext } from "src/context";

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
  status: string;
  isChecked: boolean;
};

type EditorProps = {
  postTitle: string;
};

export const errorToast = () =>
  toast.error(
    "Specify a blog image, tag and description in the post settings",
    {
      style: {
        borderRadius: 0,
        color: "#0437F2",
        backgroundColor: "#121212",
        border: "2px solid #0437F2",
        width: "300px",
      },
      duration: 4000,
    }
  );

export const postContentToast = () =>
  toast.error("Post cannot be empty", {
    style: {
      borderRadius: 0,
      color: "#0437F2",
      backgroundColor: "#121212",
      border: "2px solid #0437F2",
      width: "300px",
    },
    duration: 4000,
  });

export const draftToast = () =>
  toast.success("Draft saved. Check your profile to view drafts.", {
    style: {
      borderRadius: 0,
      color: "white",
      backgroundColor: "#121212",
      border: "2px solid #0437F2",
      width: "300px",
    },
    duration: 3000,
  });

export const submitToast = () =>
  toast.success("Post submitted. Approval status will be notified soon.", {
    style: {
      borderRadius: 0,
      color: "white",
      backgroundColor: "#121212",
      border: "2px solid #0437F2",
      width: "300px",
    },
    duration: 3000,
  });

const date = new Date();
const postsRef = collection(database, "posts");
const draftsRef = collection(database, "drafts");

export const useCreatePost = () => {
  // Get user from context
  const { user } = useUserContext()!;

  // Get post ID from URL params, set default value
  const { id = "3279ghdga!&@E&*^#&%$^!" } = useParams();
  // Initialize state for pending, draft ID, and editor content
  const [pending, setPending] = useState(false);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState("");

  // Reference to specific draft
  const draftRef = doc(database, "drafts", id!);
  // Fetch draft data
  const [draft] = useDocumentData(draftRef);

  // Function to update editor content state
  const changeEditorContent = (editorContent: string) => {
    setEditorContent(editorContent);
  };

  const handleSubmit = async (
    data: EditorProps,
    imageUrl: string | undefined,
    tag: string | undefined,
    description: string | undefined
  ) => {
    console.log(data.postTitle, editorContent, user, tag);
    // Check if post title and editor content are present
    if (data.postTitle && editorContent) {
      // Check if image, tag and description are present
      if (
        (imageUrl ?? draft?.imageDownloadUrl) &&
        (tag ?? draft?.tag) &&
        (description ?? draft?.description)
      ) {
        // Update pending state
        setPending(true);
        // Add new post to "posts" collection
        await addDoc(postsRef, {
          postTitle: data.postTitle,
          postContent: editorContent,
          imageDownloadUrl: imageUrl ?? draft?.imageDownloadUrl,
          author: { name: user?.name, id: user?.uid },
          dateCreated: date.toLocaleDateString(),
          tag: tag ?? draft?.tag,
          description: description ?? draft?.description,
          status: user && user.role === "admin" ? "approved" : "pending",
          isChecked: user && user.role === "admin" ? true : false,
        });

        // Delete the draft
        if (draft) {
          await deleteDoc(doc(database, "drafts", id!));
        }
        // Update pending state
        setPending(false);
        // Toast message
        postContentToast();
        //Redirect to homepage
        window.location.pathname = "/";
      } else {
        // Toast message
        errorToast();
      }
    } else {
      // Toast message
      postContentToast();
    }
  };

  const handleDraft = async (
    imageUrl: string | undefined,
    tag: string | undefined,
    description: string | undefined,
    draft: Partial<Blog> | undefined,
    postTitle?: string
  ) => {
    //Check if draft is not present
    if (!draft) {
      if (!draftId) {
        //Add new draft to "drafts" collection
        await addDoc(draftsRef, {
          postContent: editorContent ?? "",
          postTitle: postTitle,
          imageDownloadUrl: imageUrl ?? "",
          author: { name: user?.name, id: user?.uid },
          dateCreated: date.toLocaleDateString(),
          tag: tag ?? "",
          description: description ?? "",
        }).then((docRef) => setDraftId(docRef.id));
        // Toast message
        draftToast();
      } else {
        // Update draft in "drafts" collection
        await updateDoc(doc(database, "drafts", draftId!), {
          postContent: editorContent ?? "",
          imageDownloadUrl: imageUrl ?? "",
          postTitle: postTitle,
          author: { name: user?.name, id: user?.uid },
          dateCreated: date.toLocaleDateString(),
          tag: tag ?? "",
          description: description ?? "",
        });
        // Toast message
        draftToast();
      }
    } else {
      // Update draft in "drafts" collection
      await updateDoc(doc(database, "drafts", id!), {
        postContent: editorContent ?? "",
        postTitle: postTitle,
        imageDownloadUrl: imageUrl ?? draft.imageDownloadUrl ?? "",
        author: { name: user?.name, id: user?.uid },
        dateCreated: date.toLocaleDateString(),
        tag: tag ?? "",
        description: description ?? "",
      });
      // Toast message
      draftToast();
    }
  };

  return { changeEditorContent, handleDraft, handleSubmit, pending };
};
