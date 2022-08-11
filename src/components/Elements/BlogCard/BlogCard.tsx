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
      <div className="md:h-96 h-72 overflow-hidden pb-2 w-full">
        <div className="opacity-80 mb-4 text-lg mt-6">
          <div className="flex ">
            <p className="mr-3 font-bold text-tertiary">{authorName}</p>
            <p>{dateCreated}</p>
          </div>
          <hr className="w-4/12 border border-black mt-4" />
        </div>
        <p className="font-bold text-2xl md:text-4xl font-Amulya w-11/12 text-tertiary">
          {postTitle}
        </p>
        <p className=" my-3 text-md md:text-xl  font-Synonym max-w-sm w-11/12">
          {description.substring(0, 100)}...
        </p>
      </div>
    </article>
  );
}
