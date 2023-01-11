import { deleteDoc, doc } from "firebase/firestore";
import { Link, useLocation } from "react-router-dom";
import { database } from "src/config/firebaseConfig";
import { useUserContext } from "src/context";
import { Button } from "../Button";

type CardProps = {
  authorName: string;
  authorId?: string;
  postTitle: string;
  dateCreated: string;
  imageUrl: string;
  postId?: string;
  tag: string;
  description: string;
  loading?: "eager" | "lazy";
};

export function BlogCard({
  authorName,
  postTitle,
  imageUrl,
  dateCreated,
  tag,
  postId,
  authorId,
  description,
}: CardProps) {
  const { user } = useUserContext()!;
  /*This line gets the `user` object from the `useUserContext` hook.
   The `!` after `useUserContext()` indicates that the `user` object
    is non-nullable.*/
  const location = useLocation();
  /* This line gets the `location` object using the
   `useLocation` hook from `react-router-dom`*/

  const handleDelete = () => {
    deleteDoc(doc(database, "posts", postId!));
  };
  /* This is a function that calls the `deleteDoc`
   function and passes it the result of calling the
    `doc` function with the `database` object, the string
     "posts", and the `postId` as arguments. The `postId`
      is non-nullable. */

  return (
    <div className="py-4 font-supreme w-full">
      <Link to={`/post/${postId}`} className="rounded-xl ">
        <p className="text-md font-bold opacity-90">{tag}</p>
        <h2 className="lg:text-3xl text-2xl mb-1 lg:mb-3 font-bold">
          {postTitle}
        </h2>
      </Link>
      <div className="relative">
        <Link to={`/post/${postId}`}>
          <img
            src={imageUrl}
            alt={postTitle}
            className="w-full aspect-video object-cover rounded-xl"
          />
        </Link>
        <div className=" absolute  lg:bottom-4 lg:left-4 left-1 bottom-3  text-sm">
          <Link
            /*If the author of the post's ID matches that of the logged in
          user, the following link carries the current user to his/her profile.
          If the IDs do not match, it carries the user to the profile of the author
          of the post. */
            to={
              user && user.uid === authorId ? "/profile" : `/user/${authorId}`
            }
            className="opacity-90  bg-white rounded-full p-2"
          >
            {authorName}
          </Link>
          <p className="opacity-90 mt-2  bg-white rounded-full p-2">
            {dateCreated}
          </p>
        </div>
      </div>
      <Link to={`/post/${postId}`}>
        <p className="text-lg font-bold opacity-90 mt-2">{description}</p>
      </Link>

      {location.pathname === "/profile" && (
        /*If the current location is the current user's profile,
        A delete button is shown at the bottom of the blog card
        component. */
        <Button handleClick={handleDelete} className="mt-8">
          <img alt="Delete" src="/assets/delete.svg" width="30px" />
        </Button>
      )}
    </div>
  );
}
