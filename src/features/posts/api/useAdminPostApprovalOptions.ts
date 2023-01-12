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
  /*Create a variable 'postRef' by calling the doc function and passing in the 
  database, the collection name and the document ID, and using the 
  withConverter function to apply the blogConverter. */

  const [post, loading, error] = useDocumentData(postRef);
  /* Use the useDocumentData hook and passing in the postRef 
  variable to retrieve the post data, and destructuring the returned 
  values into 'post', 'loading', and 'error' variables. */

  const acceptPost = async (authorId: string) => {
    // Use the query, collection and where functions to create an 'authorQuery' variable
    const authorQuery = query(
      collection(database, "users"),
      where("uid", "==", authorId),
      limit(1)
    );

    // Use the updateDoc function to update the status of the post document
    updateDoc(doc(database, "posts", id!), {
      status: "approved",
    });

    // Use the getDocs function to retrieve the author data and await the result
    const querySnapshot = await getDocs(authorQuery);
    // Iterate over the retrieved data
    querySnapshot.forEach((docData) => {
      // Use the updateDoc function to update the author data and add a new notification
      updateDoc(doc(database, "users", docData.id), {
        notifications: [
          ...docData.data().notifications,
          {
            message: `Your post (${post?.postTitle}) has been approved by the admin`,
            type: "success",
            docId: id,
            dateCreated: date.toUTCString(),
          },
        ],
        isChecked: true,
      });
    });
    // Use the navigate function to navigate to the pendingposts page
    navigate("/pendingposts");
  };

  const rejectPost = async (authorId: string) => {
    // Update post in "drafts" collection with latest data
    if (post) {
      await setDoc(doc(database, "drafts", id!), {
        postTitle: post.postTitle,
        postContent: post.postContent,
        author: { name: post.author.name, id: post.author.id },
        dateCreated: date.toUTCString(),
        description: post.description,
        imageDownloadUrl: post.imageDownloadUrl,
        tag: post.tag,
      });
    }
    // Delete post from "drafts" collection
    await deleteDoc(postRef);
    // Get author data
    const authorQuery = query(
      collection(database, "users"),
      where("uid", "==", authorId),
      limit(1)
    );
    // Fetch author data and update notifications
    const querySnapshot = await getDocs(authorQuery);
    querySnapshot.forEach((docData) => {
      updateDoc(doc(database, "users", docData.id), {
        notifications: [
          ...docData.data().notifications,
          {
            message: `Your post (${post?.postTitle}) has not been approved. Review it and submit for approval once again`,
            type: "failure",
            docId: id,
          },
        ],
        isChecked: true,
      });
    });
    // Navigate to pending posts page
    navigate("/pendingposts");
  };

  return { post, loading, error, acceptPost, rejectPost };
};
