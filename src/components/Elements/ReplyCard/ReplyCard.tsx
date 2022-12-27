import { doc, updateDoc } from "firebase/firestore";
import { database } from "src/config/firebaseConfig";
import { useDeleteReply } from "src/features/posts/api/useDeleteReply";
import { useUserContext } from "src/context";
import moment from "moment";

type CardProps = {
  authorName: string;
  reply: string;
  likes: number;
  date: string;
  replyId: string;
  replyLikers: string[];
  userId: string;
};

export function ReplyCard({
  authorName,
  date,
  reply,
  likes,
  replyId,
  replyLikers,
  userId,
}: CardProps) {
  const { handleReplyDelete } = useDeleteReply();
  const dateCreated = new Date(date);
  const replyRef = doc(database, "replies", replyId);
  const newreplyLikersArray =
    replyLikers && replyLikers.filter((item) => item !== userId);

  const { user } = useUserContext()!;

  const handleLikeClick = async () => {
    if (!replyLikers.includes(userId)) {
      updateDoc(replyRef, {
        replyLikers: [...replyLikers, userId],
        likes: replyLikers.length + 1,
      });
    } else {
      updateDoc(replyRef, {
        replyLikers: newreplyLikersArray && newreplyLikersArray,
        likes: newreplyLikersArray.length,
      });
    }
  };

  return (
    <article className=" border-t border-b py-2 bg-[#eee] my-2">
      <div className="flex text-md font-bold   font-supreme justify-between mb-2  items-baseline">
        <h3 className="mr-2 text-sm">{authorName}</h3>
        <h2 className="opacity-60 text-xs">
          {moment(dateCreated).format("ddd,  m, y")}
        </h2>
      </div>

      <div>
        <p className="text-sm font-supreme">{reply}</p>
      </div>
      <div className="flex justify-between">
        <button onClick={handleLikeClick}>
          {replyLikers.includes(userId) ? <>❤️ {likes}</> : <>🤍 {likes}</>}
        </button>
        {userId === user?.id ? (
          <button onClick={() => handleReplyDelete(replyId)}>
            <img
              className="dark:invert"
              src="/assets/delete.svg"
              alt="Delete"
              width="20px"
            />
          </button>
        ) : null}
      </div>
    </article>
  );
}
