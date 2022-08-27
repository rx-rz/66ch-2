import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { database } from "src/config/firebaseConfig";
import { blogConverter, userConverter } from "src/utils";

export const useViewProfile = () => {
  const { id } = useParams();
  const postsRef = collection(database, "posts").withConverter(blogConverter);
  const [postData] = useCollectionData(postsRef);
  const posts =
    postData &&
    postData.filter((doc) => doc.author.id === id && doc.status === "approved");

  const userRef = collection(database, "users").withConverter(userConverter);
  const [userData] = useCollectionData(userRef);
  const user = userData && userData.filter((doc) => doc.uid === id)[0];

  return { posts, user };
};
