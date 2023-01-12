import { addDoc, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { database } from "src/config/firebaseConfig";
import { replyConverter } from "src/utils";

type User = {
  name: string;
  uid: string;
  role: "admin" | "writer";
  dateCreated: string;
  photoURL: string;
};

type ReplyListProps = {
  commentId: string | undefined;
  reply: string;
  likes: number;
  dateCreated: string;
  user: User;
};

const date = new Date();

export const useCreateReply = () => {
  // Reference to "replies" collection with custom converter
  const ref = collection(database, "replies").withConverter(replyConverter);
  // Fetch data from "replies" collection
  const [data] = useCollectionData(ref);

  // Reference to "replies" collection
  const replyRef = collection(database, "replies");

  const handleReplySubmit = async (
    replyData: ReplyListProps,
    commentId: string,
    user: User
  ) => {
    // Add new reply to "replies" collection
    await addDoc(replyRef, {
      reply: replyData.reply,
      commentId: commentId,
      replyAuthor: user?.name,
      replyAuthorId: user?.uid,
      dateCreated: date.toLocaleString(),
      likes: 0,
      isLiked: false,
      replyLikers: [],
    });
  };

  return { handleReplySubmit, data };
};
