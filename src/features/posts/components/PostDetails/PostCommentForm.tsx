import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { Form } from "src/components/Elements/Form/Form";
import { TextAreaField } from "src/components/Elements/Form/TextAreaField";
import { auth, database } from "src/utils/firebaseConfig";
type CommentProps = {
  comment: string;
};
export default function PostCommentForm() {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const date = new Date();
  const commentRef = collection(database, "comments");
  const handleCommentSubmit = async (data: CommentProps) => {
    await addDoc(commentRef, {
      comment: data.comment,
      postId: id,
      commentAuthor: user?.displayName,
      commentAuthorId: user?.uid,
      dateCreated: date.toLocaleTimeString(),
      likes: 0,
      isLiked: false,
      commentLikers: []
    });
  };

  return (
    <Form onSubmit={handleCommentSubmit} className="w-full max-w-4xl mx-auto ">
      {({ register, formState }) => (
        <>
          <TextAreaField
            registration={register("comment", {
              required: "Please enter a comment",
            })}
            placeholder="Enter a comment here"
            error={formState.errors.comment}
            className="border border-black w-full  resize-none"
          />
          <button type="submit" className="border-2 px-3 border-black">Comment</button>
        </>
      )}
    </Form>
  );
}
