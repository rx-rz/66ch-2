import { addDoc, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { database } from "src/config/firebaseConfig";
import { useUserContext } from "src/context";

type CommentProps = {
  comment: string;
};

export const useCreateComment = () => {
// Reference to "comments" collection
const commentRef = collection(database, "comments");
// Current date
const date = new Date();
// Get user from context
const { user } = useUserContext()!;
// Get post ID from URL params
const { id } = useParams();


const handleCommentSubmit = async (data: CommentProps) => {
  // Add new comment to "comments" collection
  await addDoc(commentRef, {
    comment: data.comment,
    postId: id,
    commentAuthor: user?.name,
    commentAuthorId: user?.uid,
    dateCreated: date.toUTCString(),
    likes: 0,
    isLiked: false,
    commentLikers: [],
  });
};


  return { handleCommentSubmit };
};
