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
  const location = useLocation();

  const handleDelete = () => {
    deleteDoc(doc(database, "posts", postId!));
  };

  return (
    <div className="py-4 font-supreme w-full">
      <Link to={`/post/${postId}`} className="rounded-xl ">
        <p className="text-md font-bold opacity-90">{tag}</p>
        <h2 className="text-3xl mb-3 font-bold">{postTitle}</h2>
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
        <Button handleClick={handleDelete} className="mt-8">
          <img alt="Delete" src="/assets/delete.svg" width="30px" />
        </Button>
      )}
    </div>
  );
}
