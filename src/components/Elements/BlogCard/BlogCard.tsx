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
    <div
      className="
     md:h-[600px] text-clip overflow-clip h-fit  max-w-[580px]
       m-1"
    >
      <div className=" my-2 md:my-0">
        <div>
          <div className="flex items-baseline opacity-80">
            <Link
              to={
                user && user.uid === authorId ? "/profile" : `/user/${authorId}`
              }
            >
              <p
                className="text-lg md:text-2xl font-pilcrow 
            hover:text-secondary transition-colors duration-300 mr-2"
              >
                {authorName}
              </p>
            </Link>
            <p className="text-md md:text-xl font-pilcrow mr-2">
              {dateCreated}
            </p>
          </div>
        </div>
        <Link to={`/post/${postId}`}>
          <img
            src={imageUrl}
            alt={postTitle}
            className="aspect-video mt-2 mb-6 border border-black
                      object-cover max-h-[30vh] md:max-h-[55vh] w-full"
            loading="lazy"
          />

          <div>
            <div className="max-h-60 overflow-clip">
              <h1 className="text-2xl md:text-3xl font-pilcrow uppercase text-ellipsis">
                {postTitle}
              </h1>
              <h2 className="text-md md:text-lg font-hind text-ellipsis max-w-md opacity-80">
                {description}
              </h2>
            </div>
          </div>
        </Link>
        {location.pathname === "/profile" && (
          <Button handleClick={handleDelete} className="mt-8">
            <img alt="Delete" src="/assets/delete.svg" width="30px" />
          </Button>
        )}
      </div>
    </div>
  );
}
