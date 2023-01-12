import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { CommentCard } from "src/components";
import { useUserContext } from "src/context/userContext";
import ReplyList from "./ReplyList";
import { database } from "src/config/firebaseConfig";
import { commentConverter } from "src/utils";

// Reference to "comments" collection with custom converter
const ref = collection(database, "comments").withConverter(commentConverter);

export default function PostComments() {
  const { id } = useParams();
  const { user } = useUserContext()!;
  // fetch data from collection and the status of the data
  const [data, loading] = useCollectionData(ref);
  // filter comments by postId and reverse the order
  const comments = data && data.filter((doc) => doc.postId === id).reverse();

  return (
    <div className="mt-12  max-w-4xl w-11/12 ">
      {loading && <p>Loading...</p>}
      {comments && (
        <article id="comments">
          {comments.map((doc) => (
            <div key={doc.id} className="md:my-12 my-4 ">
              <CommentCard
                commentLikers={doc.commentLikers}
                comment={doc.comment}
                commentId={doc.id}
                likes={doc.likes}
                authorName={doc.commentAuthor}
                userId={user?.uid!}
                date={doc.dateCreated}
              />

              <ReplyList
                commentId={doc.id}
                dateCreated={doc.dateCreated}
                likes={0}
                user={user!}
              />
            </div>
          ))}
        </article>
      )}
    </div>
  );
}
