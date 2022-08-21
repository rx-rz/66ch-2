import { addDoc, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { TextAreaField, Form } from "src/components";
import { useUserContext } from "src/context/userContext";
import { database } from "src/config/firebaseConfig";

type CommentProps = {
  comment: string;
};

const commentRef = collection(database, "comments");
const date = new Date();

export default function PostCommentForm() {
  const { user } = useUserContext()!;
  const { id } = useParams();


  const handleCommentSubmit = async (data: CommentProps) => {
    await addDoc(commentRef, {
      comment: data.comment,
      postId: id,
      commentAuthor: user?.name,
      commentAuthorId: user?.uid,
      dateCreated: date.toLocaleTimeString(),
      likes: 0,
      isLiked: false,
      commentLikers: [],
    });
  };

  return (
    <Form onSubmit={handleCommentSubmit} className="max-w-4xl mx-auto w-11/12">
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
          <button type="submit" className="border-2 px-3 border-black">
            Comment
          </button>
        </>
      )}
    </Form>
  );
}
