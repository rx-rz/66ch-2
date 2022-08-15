type CardProps = {
  authorName: string;
  comment: string;
  likes: number;
  dateCreated: string;
};

export function CommentCard({
  authorName,
  dateCreated,
  comment,
  likes,
}: CardProps) {
  return (
    <article className=" md:w-3/12 w-10/12 border-b border-b-black">
      <div className="flex">
        <h3>{authorName}</h3>
        <h2>{dateCreated}</h2>
      </div>
      <div>
        <p>{comment}</p>
      </div>
      <div>
        Likes: <button>{likes}</button>
      </div>
    </article>
  );
}
