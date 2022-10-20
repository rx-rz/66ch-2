import { FirebaseError } from "firebase/app";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { database } from "src/config/firebaseConfig";

export const useDeleteComment = () => {
  const [commentDeleteError, setCommentDeleteError] = useState("");
  const handleCommentDelete = async (id: string) => {
    await deleteDoc(doc(database, "comments", id)).then((err: any) => {
      if (err instanceof Error || FirebaseError) {
        setCommentDeleteError(err.message);
      }
    });
  };

  return {commentDeleteError, handleCommentDelete}
};
