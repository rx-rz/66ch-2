import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { CommentCard } from "src/components/Elements/CommentCard/CommentCard";
import ReplyList from "src/features/posts/components/PostDetails/ReplyList";
import { auth, database } from "src/utils/firebaseConfig";
import { commentConverter } from "../../api/commentConverter";

const ref = collection(database, "comments").withConverter(commentConverter);

export default function PostComments() {
  const { id } = useParams();
  const [user] = useAuthState(auth);

  const [data, loading] = useCollectionData(ref);
  const comments = data && data.filter((doc) => doc.postId === id).reverse();

  return (
    <div className="m-auto w-11/12 my-20">
      {loading && <p>Loading...</p>}
      {comments && (
        <article>
          {comments.map((doc) => (
            <div key={doc.id}>
              <CommentCard
                comment={doc.comment}
                likes={doc.likes}
                authorName={doc.commentAuthor}
                dateCreated={doc.dateCreated}
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
