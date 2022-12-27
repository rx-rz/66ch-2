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
    <Link to={`/post/${postId}/${status}/${authorId}`} className="rounded-xl ">
      <div className="py-4 font-supreme w-full">
        <h2 className="lg:text-3xl text-2xl mb-1 lg:mb-3 font-bold">
          {postTitle}
        </h2>

        <div className="relative">
          <img
            src={imageUrl}
            alt={postTitle}
            className="w-full aspect-video object-cover rounded-xl"
          />
          <div className=" absolute  lg:bottom-4 lg:left-4 left-1 bottom-3  text-sm">
            <p className="opacity-90  bg-white rounded-full p-2">
              {authorName}
            </p>
            <p className="opacity-90 mt-2  bg-white rounded-full p-2">
              {dateCreated}
            </p>
          </div>
        </div>

        <p className="text-lg font-bold opacity-90 mt-2">{description}</p>
      </div>
    </Link>
  );
}
