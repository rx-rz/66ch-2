import { doc, updateDoc } from "firebase/firestore";
import { database } from "src/config/firebaseConfig";
import { useDeleteComment } from "src/features/posts/api/useDeleteComment";
import { useUserContext } from "src/context";
import moment from "moment";

type CardProps = {
  authorName: string;
  comment: string;
  likes: number;
  date: string;
  userId: string;
  commentId: string;
  commentLikers: string[];
};

export function CommentCard({
  authorName,
  date,
  comment,
  likes,
  commentId,
  userId,
  commentLikers,
}: CardProps) {
  const { handleCommentDelete } = useDeleteComment();
  /*This line destructures the `handleCommentDelete`
   function from the `useDeleteComment` hook.*/

  const { user } = useUserContext()!;
  /* This line gets the `user` object from the `useUserContext`
   hook. The `!` after `useUserContext()` indicates that the
    `user` object is non-nullable. */

  const newCommentLikersArray =
    commentLikers && commentLikers.filter((item) => item !== userId);
  /*A filter to check whether or not the id of the item matches the current user id*/

  const commentRef = doc(database, "comments", commentId);
  /* This line defines a constant called `commentRef` that
   is the result of calling the `doc` function with the 
   `database` object, the string "comments", and the `commentId`
    as arguments. */

  const handleLikeClick = async () => {
    /* This is a function that asynchronously
     updates the `likes` and `commentLikers` fields 
     of the document with the `commentId` in the `comments` 
     collection of the Firestore database. */

    if (!commentLikers.includes(userId)) {
      // If the `userId` is not included in the `commentLikers` array,
      updateDoc(commentRef, {
        /* the `updateDoc` function is called with `commentRef`
         and an object containing the `commentLikers` and `likes`
         fields as arguments. The `commentLikers` field is set to
         a new array that is the result of concatenating the `commentLikers`
         array with the `userId` using the spread operator (`...`). The `likes`
          field is set to the length of the `commentLikers` array plus 1. */
        commentLikers: [...commentLikers, userId],
        likes: commentLikers.length + 1,
      });
    } else {
      // If the `userId` is included in the `commentLikers` array,
      updateDoc(commentRef, {
        // the `updateDoc` function is called with `commentRef` and an object containing the `commentLikers` and `likes` fields as arguments. The `commentLikers` field is set to the `newCommentLikersArray` and the `likes` field is set to the length of the `newCommentLikersArray`.
        commentLikers: newCommentLikersArray && newCommentLikersArray,
        likes: newCommentLikersArray.length,
      });
    }
  };

  const dateCreated = new Date(date);
  return (
    <article
      className="py-4 border-t border-b font-supreme
     md:w-10/12 w-full "
    >
      <div className="flex font-bold font-pilcrow justify-between items-baseline">
        <h3 className="mr-2 text-md opacity-60">{authorName}</h3>
        <h2 className="opacity-60 text-xs">
          {moment(dateCreated).format("ddd,  m, y")}
        </h2>
      </div>

      <div>
        <p className="md:text-lg  my-2 font-supreme font-bold  ">{comment}</p>
      </div>
      <div className="flex justify-between">
        <button onClick={handleLikeClick} className="font-pilcrow">
          {/* The heart emoji changes color to red if the comment has already been liked by the logged in user. */}
          {commentLikers.includes(userId) ? <>❤️ {likes}</> : <>🤍 {likes}</>}
        </button>

        {user && userId === user.id ? (
          /*If the id of the commenter is the same as the logged in user's id,
           he/she will see a delete button to delete the comment. */
          <button onClick={() => handleCommentDelete(commentId)}>
            <img src="/assets/delete.svg" alt="Delete" width="20px" />
          </button>
        ) : null}
      </div>
    </article>
  );
}
