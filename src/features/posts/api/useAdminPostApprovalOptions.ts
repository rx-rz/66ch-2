import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "src/config/firebaseConfig";
import { blogConverter } from "src/utils";

export const useAdminPostApprovalOptions = () => {
  const date = new Date();
  const { id } = useParams();
  const navigate = useNavigate();

  const postRef = doc(database, "posts", id!).withConverter(blogConverter);
  const [post] = useDocumentData(postRef);
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
            message: `Your post (${post?.postTitle}) has been approved by the admin`,
            type: "success",
            docId: id,
            dateCreated: date.toUTCString()
          },
        ],
        isChecked: true,
      });
    });
    navigate("/pendingposts");
  };


  const rejectPost = async (authorId: string) => {
    post &&
      (await setDoc(doc(database, "drafts", id!), {
        postTitle: post.postTitle,
        postContent: post.postContent,
        author: { name: post.author.name, id: post.author.id },
        dateCreated: date.toUTCString(),
        description: post.description,
        imageDownloadUrl: post.imageDownloadUrl,
        tag: post.tag,
      }));
    await deleteDoc(postRef);
    const authorQuery = query(
      collection(database, "users"),
      where("uid", "==", authorId),
      limit(1)
    );

    const querySnapshot = await getDocs(authorQuery)
    querySnapshot.forEach((docData) => {
      updateDoc(doc(database, "users", docData.id), {
        notifications: [
          ...docData.data().notifications,
          {
            message:
              `Your post (${post?.postTitle}) has not been approved. Review it and submit for approval once again`,
            type: "failure",
            docId: id,
          },
        ],
        isChecked: true,
      });
    });
    // navigate("/pendingposts");
  };

  return { postRef, acceptPost, rejectPost };
};
