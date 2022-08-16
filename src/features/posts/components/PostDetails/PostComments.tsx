import { collection } from "firebase/firestore";
import { useRef } from "react";
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


  const replyRef = useRef<HTMLDivElement | null>(null)

  const handeDisplayReplies = () => {
    replyRef.current?.classList.toggle("hidden")
  }
  const [data, loading] = useCollectionData(ref);
  const comments = data && data.filter((doc) => doc.postId === id).reverse();

  return (
    <div className=" my-20">
      {loading && <p>Loading...</p>}
      {comments && (
        <article>
          <h1 className=" text-2xl my-4 mb-12 md:text-3xl font-medium">
            COMMENTS
          </h1>
          {comments.map((doc) => (
            <div key={doc.id}>
              <CommentCard
                commentLikers={doc.commentLikers}
                comment={doc.comment}
                commentId={doc.id}
                likes={doc.likes}
                authorName={doc.commentAuthor}
                userId={user?.uid!}
                dateCreated={doc.dateCreated}
              />
{              <button onClick={handeDisplayReplies}>Show replies...</button>}
              <div ref={replyRef} className="hidden">
                <ReplyList
                  commentId={doc.id}
                  dateCreated={doc.dateCreated}
                  likes={0}
                  user={user!}
                />
              </div>
            </div>
          ))}
        </article>
      )}
    </div>
  );
}
