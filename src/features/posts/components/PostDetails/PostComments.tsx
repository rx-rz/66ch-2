import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { CommentCard } from "src/components/Elements/CommentCard/CommentCard";
import { Form } from "src/components/Elements/Form/Form";
import { TextAreaField } from "src/components/Elements/Form/TextAreaField";
import ReplyList from "src/components/Elements/ReplyList/ReplyList";
import { auth, database } from "src/utils/firebaseConfig";
import { commentConverter } from "../../api/commentConverter";

type ReplyProps = {
  reply: string;
};
export default function PostComments() {
  const [user] = useAuthState(auth);
  const ref = collection(database, "comments").withConverter(commentConverter);
  const { id } = useParams();
  const [data, loading] = useCollectionData(ref);
  const date = new Date();
  const posts = data && data.filter((doc) => doc.postId === id).reverse();
  const replyRef = collection(database, "replies");
  const handleReplySubmit = async (data: ReplyProps) => {
    await addDoc(replyRef, {
      comment: data.reply,
      postId: id,
      commentAuthor: user?.displayName,
      commentAuthorId: user?.uid,
      dateCreated: date.toLocaleDateString(),
      likes: 0,
    });
  };
  return (
    <div className="m-auto w-11/12 my-20">
      {loading && <p>Loading...</p>}
      {posts && (
        <article className="grid md:gap-24 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((doc) => (
            <div key={doc.id}>
              <CommentCard
                comment={doc.comment}
                likes={doc.likes}
                authorName={doc.commentAuthor}
                dateCreated={doc.dateCreated}
              />
              <ReplyList commentId={doc.id} dateCreated={doc.dateCreated} likes={0} user={user!}/>
              {/* <div>
                <Form onSubmit={handleReplySubmit}>
                  {({ register, formState }) => (
                    <>
                      <TextAreaField registration={register("reply")} />
                      <button>Submit</button>
                    </>
                  )}
                </Form>
              </div> */}
            </div>
          ))}
        </article>
      )}
    </div>
  );
}
