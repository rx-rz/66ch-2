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
  // import handleReplySubmit function and data from useCreateReply hook
  const { handleReplySubmit, data } = useCreateReply();
  // filter replies by commentId and sort them by dateCreated in descending order
  const replies =
    data &&
    data
      .filter((doc) => doc.commentId === commentId)
      .sort(function (a, b) {
        return Date.parse(b.dateCreated) - Date.parse(a.dateCreated);
      });
  // create a ref to access the DOM
  const replyTag = useRef<HTMLDivElement | null>(null);
  // toggle the visibility of the reply section
  const handleReplyDisplay = () => {
    replyTag.current?.classList.toggle("hidden");
  };

  return (
    <div className="md:w-8/12 w-10/12">
      <button
        onClick={handleReplyDisplay}
        className="font-supreme font-bold text-sm"
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
                date={doc.dateCreated}
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
                  placeholder="Enter your reply here"
                  className="border-2 rounded-none  font-supreme text-sm text-black p-1
                   border-black resize-none w-11/12 "
                />
                <button
                  type="submit"
                  className=" border-black bg-secondary 
                   font-supreme px-3 my-2 border-2 text-white font-bold"
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
