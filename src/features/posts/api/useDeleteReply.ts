import { FirebaseError } from "firebase/app";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { database } from "src/config/firebaseConfig";

export const useDeleteReply = () => {
  // Initialize state for reply delete error
  const [replyDeleteError, setReplyDeleteError] = useState("");

  const handleReplyDelete = async (id: string) => {
    // Delete reply
    await deleteDoc(doc(database, "replies", id)).then((err: any) => {
      // check if there's an error
      if (err instanceof Error || FirebaseError) {
        setReplyDeleteError(err.message);
      }
    });
  };

  return { replyDeleteError, handleReplyDelete };
};
