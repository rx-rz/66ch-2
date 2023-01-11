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
  // handleReplyDelete imported from custom hook 'useDeleteReply'
  const { handleReplyDelete } = useDeleteReply();
  // Creates a new date object from the passed in date value
  const dateCreated = new Date(date);
  // reference to the reply document in the replies collection
  const replyRef = doc(database, "replies", replyId);
  // newreplyLikersArray is the array of all the likers of the reply after filtering out the current user
  const newreplyLikersArray =
    replyLikers && replyLikers.filter((item) => item !== userId);

  // useUserContext hook is used to get the currently logged in user
  const { user } = useUserContext()!;

  // handleLikeClick is an async function that manages the like functionality of replies
  const handleLikeClick = async () => {
    // check if the user has already liked the reply
    if (!replyLikers.includes(userId)) {
      // if the user has not yet liked the reply, update the reply document with the new liker
      updateDoc(replyRef, {
        replyLikers: [...replyLikers, userId], // add the current user to the array of likers
        likes: replyLikers.length + 1, // increase the total like count by 1
      });
    } else {
      // if the user has already liked the reply, update the reply document to remove the user from likers
      updateDoc(replyRef, {
        replyLikers: newreplyLikersArray && newreplyLikersArray, // remove current user from the array of likers
        likes: newreplyLikersArray.length, // decrease the total like count by 1
      });
    }
  };

  return (
    <article className=" border-t border-b py-2 bg-[#eee] my-2">
      <div
        className="flex text-md font-bold   font-supreme justify-between mb-2  items-baseline"
        /*the following code displays the author name and the date the comment was created. */
      >
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
          {/* The heart emoji changes color to red if the comment has already been liked by the logged in user. */}
          {replyLikers.includes(userId) ? <>❤️ {likes}</> : <>🤍 {likes}</>}
        </button>
        {userId === user?.id ? (
          /*If the id of the commenter is the same as the logged in user's id,
           he/she will see a delete button to delete the comment. */
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
