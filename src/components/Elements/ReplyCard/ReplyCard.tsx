import { doc, updateDoc } from "firebase/firestore";
import { database } from "src/utils/firebaseConfig";

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
    <article className=" my-4 p-4 border border-tertiary rounded-md">
      <div className="flex">
        <h3>{authorName}</h3>
        <h2>{dateCreated}</h2>
      </div>
      <div>
        <p>{reply}</p>
      </div>
      <div>
        Likes: <button onClick={handleLikeClick}>{likes}</button>
      </div>
    </article>
  );
}
