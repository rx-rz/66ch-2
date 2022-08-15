import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { Form } from "src/components/Elements/Form/Form";
import { TextAreaField } from "src/components/Elements/Form/TextAreaField";
import { auth, database } from "src/utils/firebaseConfig";
import { User } from "firebase/auth";
import React, { useEffect } from "react";
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
  const [value, loading, error] = useCollection(
    collection(database, "replies"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const replies =
    value && value.docs.filter((doc) => doc.data().commentId === commentId);
  const date = new Date();
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
      {replies && replies.map((doc) => <React.Fragment key={doc.id}>{doc.data().commentAuthor} {doc.data().reply} {doc.data().dateCreated}</React.Fragment>)}
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
