import { Link } from "react-router-dom";

type CardProps = {
  authorName: string;
  postTitle: string;
  dateCreated: string;
  imageUrl: string;
  tag: string;
  description: string;
};

export function BlogCard({
  authorName,
  postTitle,
  imageUrl,
  dateCreated,
  tag,
  description,
}: CardProps) {
  return (
    <article className="  p-4 hover:bg-primary hover:text-white transition-colors duration-300 mx-auto">
      <img
        src={imageUrl}
        alt={postTitle}
        className="w-full h-full object-cover max-w-sm aspect-video"
      />
      <div className="h-72 overflow-hidden">
        <div className="flex opacity-80 mb-8 text-lg mt-6">
          <p className="mr-3 font-bold">{authorName}</p>
          <p>{dateCreated}</p>
        </div>
        <p className="font-medium text-3xl md:text-4xl font-Amulya max-w-sm">
          {postTitle}
        </p>
        <p className=" my-6 text-md md:text-xl w-10/12 font-Synonym max-w-sm">
          {description.substring(0, 100)}...
        </p>
      </div>
    </article>
  );
}
