import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useUserContext } from "src/context";

type CardProps = {
  authorName: string;
  status: string;
  authorId?: string;
  postTitle: string;
  dateCreated: string;
  imageUrl: string;
  postId?: string;
  description: string;
  loading?: "eager" | "lazy";
};

export function PendingBlogCard({
  authorName,
  postTitle,
  imageUrl,
  dateCreated,
  status,
  postId,
  authorId,
  description,
}: CardProps) {
  const { user } = useUserContext()!;
  return (
    <div className=" border-2 border-black dark:border-white md:h-[700px] text-clip overflow-clip h-fit dark:text-white dark:bg-tertiary m-1">
      <div className="md:p-8 p-2 my-8 md:my-0">
        <div
        >
          <p className="text-lg md:text-2xl font-pilcrow mr-2 mb-2">
            {dateCreated}
          </p>
          <Link
            to={
              user && user.uid === authorId ? "/profile" : `/user/${authorId}`
            }
          >
            <p className="text-xl md:text-3xl font-pilcrow mt-2 hover:text-secondary transition-colors duration-300">
              {authorName}
            </p>
          </Link>
        </div>
        <Link
          to={`/post/${postId}/${status}/${authorId}`}
          key={postId}
          className="w-fit"
        >
          <img
            src={imageUrl}
            alt={postTitle}
            className="aspect-video object-cover border border-black my-4"
            loading="lazy"
          />
          <div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
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
      </div>
    </div>
  );
}
