import { Link } from "react-router-dom";

type CardProps = {
  authorName: string;
  postTitle: string;
  dateCreated: string;
  imageUrl: string;
};

export function ProductCard({
  authorName,
  postTitle,
  imageUrl,
  dateCreated,
}: CardProps) {
  return (
    <article className=" m-4 p-8 border border-black">
      <div className="flex justify-between mb-4">
        <p>{authorName}</p>
        <p>{dateCreated}</p>
      </div>
      <img
        src={imageUrl}
        alt={postTitle}
        className="w-full h-full object-cover max-w-sm aspect-square"
      />
      <p className="font-medium  mt-4 text-2xl font-Synonym max-w-sm">{postTitle}</p>
    </article>
  );
}
