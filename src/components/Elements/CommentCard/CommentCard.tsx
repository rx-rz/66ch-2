type CardProps = {
    authorName: string;
    comment: string;
    likes: number
    dateCreated: string;
    
  };
  
  export function CommentCard({
    authorName,
    dateCreated,
    comment,
    likes

  }: CardProps) {
    return (
      <article className=" mx-auto">

        <div className="md:h-96 h-72 overflow-hidden pb-2 w-full">
          <div className="opacity-80 mb-4 text-lg mt-6">
            <div className="flex ">
              <p className="mr-3 font-bold ">{authorName}</p>
              <p>{dateCreated}</p>
            </div>
            <hr className="w-4/12 border border-black mt-4" />
          </div>
          <p className="font-bold text-2xl md:text-4xl font-Amulya w-11/12 text-tertiary">
            {comment}
          </p>
          <p className=" my-3 text-md md:text-xl  font-Synonym max-w-sm w-11/12">
            {likes}
          </p>
        </div>
      </article>
    );
  }
  