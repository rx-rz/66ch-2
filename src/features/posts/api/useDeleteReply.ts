import { FirebaseError } from "firebase/app";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { database } from "src/config/firebaseConfig";

export const useDeleteReply = () => {
  const [replyDeleteError, setReplyDeleteError] = useState("");
  const handleReplyDelete = async (id: string) => {
    await deleteDoc(doc(database, "replies", id)).then((err: any) => {
      if (err instanceof Error || FirebaseError) {
        setReplyDeleteError(err.message);
      }
    });
  };

  return { replyDeleteError, handleReplyDelete };
};
