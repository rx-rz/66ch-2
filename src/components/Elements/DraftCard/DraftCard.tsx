import { deleteDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { database } from "src/config/firebaseConfig";
import { Button } from "../Button";
import deleteButton from "src/assets/delete.svg";
type CardProps = {
  authorName: string;
  postTitle: string;
  dateCreated: string;
  imageUrl: string;
  postId?: string;
  tag: string;
  description: string;
  loading?: "eager" | "lazy";
};

export function DraftCard({
  postTitle,
  imageUrl,
  dateCreated,
  description,
  tag,
  postId,
}: CardProps) {
  const location = useLocation();

  const handleDelete = () => {
    deleteDoc(doc(database, "drafts", postId!));
  };
  return (
    <div className=" border-2 border-black dark:border-white md:h-[600px] text-clip overflow-clip h-fit dark:text-white dark:bg-tertiary m-1">
      <div className="md:p-8 p-2 my-8 md:my-0">
        <Link to={`/createpost/${postId}`}>
          <div
          >
            <p className="text-lg md:text-2xl font-pilcrow mr-2 mb-2">
              {dateCreated}
            </p>
          </div>

          <img
            src={imageUrl}
            alt={postTitle}
            className="aspect-video object-cover border border-black my-4 dark:border-white"
            loading="lazy"
          />
          <div
          >
            <div className="max-h-72 overflow-clip">
              <h1 className="text-3xl md:text-4xl font-pilcrow uppercase text-ellipsis">
                {postTitle}
              </h1>
              <h2 className="text-lg md:text-xl font-hind text-ellipsis">
                {description}
              </h2>
            </div>
          </div>
        </Link>
        {location.pathname === "/profile" && (
          <Button handleClick={handleDelete} className="mt-8">
            <img
              alt="Delete"
              src={deleteButton}
              width="30px"
              className="dark:invert"
            />
          </Button>
        )}
      </div>
    </div>
  );
}
