import { deleteDoc, doc } from "firebase/firestore";
import { Link, useLocation } from "react-router-dom";
import { database } from "src/config/firebaseConfig";
import { Button } from "../Button";
type CardProps = {
  authorName: string;
  postTitle: string;
  dateCreated: string;
  imageUrl: string;
  postId?: string;
  tag: string;
  description: string;
  loading?: "eager" | "lazy";
};

export function DraftCard({
  postTitle,
  imageUrl,
  dateCreated,
  description,
  tag,
  postId,
}: CardProps) {
  const location = useLocation();
  // This line gets the `location` object using the `useLocation` hook from `react-router-dom`.

  const handleDelete = () => {
    // This is a function that asynchronously deletes the document with the `postId` in the `drafts` collection of the Firestore database.
    deleteDoc(doc(database, "drafts", postId!));
    // This line calls the `deleteDoc` function and passes it the result of calling the `doc` function with the `database` object, the string "drafts", and the `postId` as arguments. The `postId` is non-nullable.
  };
  return (
    <div
      className=" border-2 border-black 
     md:h-[600px] text-clip overflow-clip h-fit 
       m-1"
    >
      <div className="md:p-8 p-2 my-8 md:my-0">
        <Link to={`/createpost/${postId}`}>
          <div>
            <p className="text-lg md:text-2xl font-pilcrow mr-2 mb-2">
              {dateCreated}
            </p>
          </div>

          <img
            src={imageUrl}
            alt={postTitle}
            className="aspect-video object-cover border
             border-black my-4 "
            loading="lazy"
          />
          <div>
            <div className="max-h-72 overflow-clip">
              <h1
                className="text-3xl md:text-4xl font-pilcrow 
              uppercase text-ellipsis"
              >
                {postTitle}
              </h1>
              <h2 className="text-lg md:text-xl font-hind text-ellipsis">
                {description}
              </h2>
            </div>
          </div>
        </Link>
        {location.pathname === "/profile" && (
          <Button handleClick={handleDelete} className="mt-8">
            <img alt="Delete" src="/images/delete.svg" width="30px" />
          </Button>
        )}
      </div>
    </div>
  );
}
