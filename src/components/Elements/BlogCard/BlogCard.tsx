type CardProps = {
  authorName: string;
  postTitle: string;
  dateCreated: string;
  imageUrl: string;
  tag: string;
  description: string;
  loading?: "eager" | "lazy"
};

export function BlogCard({
  authorName,
  postTitle,
  imageUrl,
  dateCreated,
  tag,
  loading,
  description,
}: CardProps) {
  return (
    <article className="mx-auto">
      <img
        src={imageUrl}
        alt={postTitle}
        loading={loading}
        className="w-full max-h-full h-80  block object-cover aspect-video"
      />
      <div className="md:h-96 h-80 overflow-hidden pb-2 w-full">
        <div className="opacity-80 mb-4 text-lg mt-6">
          <div className="flex ">
            <p className="mr-3 font-bold ">{authorName}</p>
            <p>{dateCreated}</p>
          </div>
          <hr className="w-4/12 border border-black mt-4" />
        </div>
        <p className=" text-3xl xl:text-4xl font-medium font-Amulya w-11/12 text-tertiary">
          {postTitle}
        </p>
        <p className=" my-3 text-lg opacity-90 md:text-xl  font-Synonym max-w-sm w-11/12">
          {description.substring(0, 200)}...
        </p>
      </div>
    </article>
  );
}
