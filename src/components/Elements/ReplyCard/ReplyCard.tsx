import { doc, updateDoc } from "firebase/firestore";
import { database } from "src/config/firebaseConfig";

type CardProps = {
  authorName: string;
  reply: string;
  likes: number;
  dateCreated: string;
  replyId: string;
  replyLikers: string[];
  userId: string;
};

export function ReplyCard({
  authorName,
  dateCreated,
  reply,
  likes,
  replyId,
  replyLikers,
  userId,
}: CardProps) {
  const replyRef = doc(database, "replies", replyId);
  const newreplyLikersArray =
    replyLikers && replyLikers.filter((item) => item !== userId);

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
    <article className=" border border-black p-2 dark:border-white my-2">
      <div className="flex text-md font-bold  font-pilcrow">
        <h3 className="mr-2">{authorName}</h3>
        <h2 className="opacity-60">{dateCreated}</h2>
      </div>
      <hr className="border border-secondary"/>
      <div>
        <p className="text-sm font-hind">{reply}</p>
      </div>
      <div>
        <button onClick={handleLikeClick}>{replyLikers.includes(userId) ? <>❤️ {likes}</> : <>🤍 {likes}</>}</button>
      </div>
    </article>
  );
}
