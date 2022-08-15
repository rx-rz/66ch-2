import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { CommentCard } from "src/components/Elements/CommentCard/CommentCard";
import { Form } from "src/components/Elements/Form/Form";
import { TextAreaField } from "src/components/Elements/Form/TextAreaField";
import { auth, database } from "src/utils/firebaseConfig";
import { commentConverter } from "src/features/posts/api/commentConverter";
import { User } from "firebase/auth";
type ReplyListProps = {
  commentId: string;
  reply: string;
  likes: number;
  dateCreated: string;
  user: User;
};

export default function ReplyList({
  dateCreated,
  likes,
  commentId,
}: Partial<ReplyListProps>) {
  const [user] = useAuthState(auth);
  const ref = collection(database, "replies").withConverter(commentConverter);
  const { id } = useParams();
  const [data, loading] = useCollectionData(ref);
  const date = new Date();
  const posts = data && data.filter((doc) => doc.postId === id).reverse();
  const replyRef = collection(database, "replies");
  const handleReplySubmit = async (data: ReplyListProps) => {
    await addDoc(replyRef, {
      reply: data.reply,
      commentId: commentId,
      commentAuthor: user?.displayName,
      commentAuthorId: user?.uid,
      dateCreated: date.toLocaleDateString(),
      likes: 0,
    });
  };

  return (
    <div>
      <Form onSubmit={handleReplySubmit}>
        {({ register, formState }) => (
          <>
            <TextAreaField registration={register("reply")} />
            <button>Submit</button>
          </>
        )}
      </Form>
    </div>
  );
}
