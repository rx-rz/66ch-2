import React, { useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Form } from "src/components/Elements/Form/Form";
import { TextAreaField } from "src/components/Elements/Form/TextAreaField";
import { database } from "src/utils/firebaseConfig";
import { User } from "firebase/auth";
import { ReplyCard } from "src/components/Elements/ReplyCard/ReplyCard";
import { replyConverter } from "../../api/replyConverter";

type ReplyListProps = {
  commentId: string;
  reply: string;
  likes: number;
  dateCreated: string;
  user: User;
};

export default function ReplyList({
  commentId,
  user,
}: Partial<ReplyListProps>) {
  const ref = collection(database, "replies").withConverter(replyConverter);
  const [data] = useCollectionData(ref);
  const replies =
    data && data.filter((doc) => doc.commentId === commentId).reverse();

  const date = new Date();
  const replyRef = collection(database, "replies");
  const handleReplySubmit = async (data: ReplyListProps) => {
    await addDoc(replyRef, {
      reply: data.reply,
      commentId: commentId,
      replyAuthor: user?.displayName,
      dateCreated: date.toLocaleDateString(),
      likes: 0,
      isLiked: false,
      replyLikers: [],
    });
  };
  const replyTag = useRef<HTMLDivElement | null>(null);
  const handleReplyDisplay = () => {
    replyTag.current?.classList.toggle("hidden");
  };
  return (
    <div className="w-11/12">
      <button onClick={handleReplyDisplay}>
        {replies && replies.length > 0 ? (
          <>Show Replies ( {replies.length} )</>
        ) : (
          <>Reply</>
        )}
      </button>
      <div ref={replyTag} className="hidden">
        {replies &&
          replies.map((doc) => (
            <React.Fragment key={doc.id}>
              <ReplyCard
                replyLikers={doc.replyLikers}
                authorName={doc.replyAuthor!}
                dateCreated={doc.dateCreated}
                likes={doc.likes}
                reply={doc.reply!}
                replyId={doc.id}
                userId={user?.uid!}
              />
            </React.Fragment>
          ))}
        <Form onSubmit={handleReplySubmit}>
          {({ register }) => (
            <>
              <TextAreaField
                registration={register("reply")}
                className="border border-black resize-none w-11/12"
              />
              <button className=" border-black px-3 my-2 border-2">
                Reply
              </button>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}
