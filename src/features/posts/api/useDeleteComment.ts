import { FirebaseError } from "firebase/app";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { database } from "src/config/firebaseConfig";

export const useDeleteComment = () => {
  // Initialize state for comment delete error
  const [commentDeleteError, setCommentDeleteError] = useState("");

  const handleCommentDelete = async (id: string) => {
    //Delete comment
    await deleteDoc(doc(database, "comments", id)).then((err: any) => {
      // check if there's an error
      if (err instanceof Error || FirebaseError) {
        setCommentDeleteError(err.message);
      }
    });
  };

  return { commentDeleteError, handleCommentDelete };
};
