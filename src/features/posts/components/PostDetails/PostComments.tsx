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
    <div className="my-20 max-w-4xl mx-auto w-11/12">
      {loading && <p>Loading...</p>}
      {comments && (
        <article>
          {comments.map((doc) => (
            <div key={doc.id} className="md:my-12 my-4 ">
              <CommentCard
                commentLikers={doc.commentLikers}
                comment={doc.comment}
                commentId={doc.id}
                likes={doc.likes}
                authorName={doc.commentAuthor}
                userId={user?.uid!}
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
