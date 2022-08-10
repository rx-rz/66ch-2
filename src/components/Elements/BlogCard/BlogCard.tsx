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
    <article className=" mx-auto">
      <img
        src={imageUrl}
        alt={postTitle}
        className="w-full h-full object-cover max-w-sm aspect-video"
      />
      <div className="md:h-96 h-72 overflow-hidden p-2">
        <div className="opacity-80 mb-8 text-lg mt-6">
          <div className="flex ">
            <p className="mr-3 font-bold">{authorName}</p>
            <p>{dateCreated}</p>
          </div>
          <hr className="w-4/12 border border-black mt-8" />
        </div>
        <p className="font-medium text-2xl md:text-4xl font-Amulya max-w-sm">
          {postTitle}
        </p>
        <p className=" my-6 text-md md:text-xl w-10/12 font-Synonym max-w-sm">
          {description.substring(0, 100)}...
        </p>
      </div>
    </article>
  );
}
