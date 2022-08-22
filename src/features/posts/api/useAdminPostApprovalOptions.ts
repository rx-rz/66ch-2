import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "src/config/firebaseConfig";
import { blogConverter } from "src/utils";

export const useAdminPostApprovalOptions = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const postRef = doc(database, "posts", id!).withConverter(blogConverter);

  const acceptPost = async (authorId: string) => {
    const authorQuery = query(
        collection(database, "users"),
        where("uid", "==", authorId),
        limit(1)
      );
    updateDoc(doc(database, "posts", id!), {
      status: "approved",
    });
    const querySnapshot = await getDocs(authorQuery);
    querySnapshot.forEach((docData) => {
      updateDoc(doc(database, "users", docData.id), {
        notifications: [
          ...docData.data().notifications,
          {
            message: "Your post has been approved by the admin",
            type: "success",
            docId: id,
          },
        ],
        isChecked: true,
      });
    });
    navigate("/pendingposts");
  };

  const rejectPost = async (authorId: string) => {
    const authorQuery = query(
        collection(database, "users"),
        where("uid", "==", authorId),
        limit(1)
      );
    const querySnapshot = await getDocs(authorQuery);
    querySnapshot.forEach((docData) => {
      updateDoc(doc(database, "users", docData.id), {
        notifications: [
          ...docData.data().notifications,
          {
            message:
              "Your post has not been approved. Review it and submit for approval once again",
            type: "failure",
            docId: id,
          },
        ],
        isChecked: true,
      });
    });
    navigate("/pendingposts");
  };

  return { postRef, acceptPost, rejectPost };
};
