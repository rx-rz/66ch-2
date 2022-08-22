import { addDoc, collection } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { database } from 'src/config/firebaseConfig';
import { useUserContext } from 'src/context';

type CommentProps = {
    comment: string;
  };

export const useCreateComment = () => {
    const commentRef = collection(database, "comments");
    const date = new Date();
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

    return {handleCommentSubmit}
}
