// import delete from "src/assets/delete.svg"
import { deleteDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { database } from "src/config/firebaseConfig";
import { useUserContext } from "src/context";
import { Button } from "../Button";
import deleteButton from "src/assets/delete.svg";

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
    <div className=" border-2 border-black dark:border-white md:h-[700px] text-clip overflow-clip h-fit dark:text-white dark:bg-tertiary m-1">
      <div className="md:p-8 p-2 my-8 md:my-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-lg md:text-2xl font-pilcrow mr-2 mb-2">
            {dateCreated}
          </p>
          <Link
            to={`/search/${tag}`}
            className="border border-black font-pilcrow px-1 dark:border-white"
          >
            {tag}
          </Link>
          <Link
            to={
              user && user.uid === authorId ? "/profile" : `/user/${authorId}`
            }
          >
            <p className="text-xl md:text-3xl font-pilcrow mt-2 hover:text-secondary transition-colors duration-300">
              {authorName}
            </p>
          </Link>
        </motion.div>
        <Link to={`/post/${postId}`}>
          <img
            src={imageUrl}
            alt={postTitle}
            className="aspect-video object-cover border border-black my-4"
            loading="lazy"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="max-h-60 overflow-clip">
              <h1 className="text-3xl md:text-4xl font-pilcrow uppercase text-ellipsis">
                {postTitle}
              </h1>
              <h2 className="text-lg md:text-xl font-hind text-ellipsis">
                {description}
              </h2>
            </div>
          </motion.div>
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
