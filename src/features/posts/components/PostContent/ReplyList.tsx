import React, { useRef } from "react";
import { TextAreaField, Form, ReplyCard } from "src/components";
import { useCreateReply } from "../../api/useCreateReply";

type User = {
  name: string;
  uid: string;
  role: "admin" | "writer";
  dateCreated: string;
  photoURL: string;
};

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
  const { handleReplySubmit, data } = useCreateReply();

  const replies =
    data &&
    data
      .filter((doc) => doc.commentId === commentId)
      .sort(function (a, b) {
        return Date.parse(a.dateCreated) - Date.parse(b.dateCreated);
      });

  const replyTag = useRef<HTMLDivElement | null>(null);

  const handleReplyDisplay = () => {
    replyTag.current?.classList.toggle("hidden");
  };
  return (
    <div className="md:w-8/12 w-10/12">
      <button
        onClick={handleReplyDisplay}
        className="font-pilcrow font-extralight"
      >
        {replies && replies.length > 0 ? (
          <>Show Replies ( {replies.length} )</>
        ) : (
          <>Reply</>
        )}
      </button>
      <div ref={replyTag} className="hidden mt-2">
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
        {user && (
          <Form
            onSubmit={(data: ReplyListProps) =>
              handleReplySubmit(data, commentId!, user!)
            }
          >
            {({ register }) => (
              <>
                <TextAreaField
                  registration={register("reply")}
                  className="border-2 dark:border-white text-black
                   border-black resize-none w-11/12 "
                />
                <button
                  type="submit"
                  className=" border-black bg-secondary dark:border-white
                   font-pilcrow px-3 my-2 border-2 text-white"
                >
                  Reply
                </button>
              </>
            )}
          </Form>
        )}
      </div>
    </div>
  );
}
