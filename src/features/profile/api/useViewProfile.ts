import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { database } from "src/config/firebaseConfig";
import { blogConverter, userConverter } from "src/utils";

export const useViewProfile = () => {
  // Get the id from the URL's parameters using the useParams hook
  const { id } = useParams();

  // Create a reference to the "posts" collection in the database, with a converter function of blogConverter
  const postsRef = collection(database, "posts").withConverter(blogConverter);
  // Use the useCollectionData hook to get the data from the postsRef, and destructure it into a variable called postData
  const [postData] = useCollectionData(postsRef);
  //Filter the postData by checking if the author id is equal to the id from the URL and the status is "approved"
  const posts =
    postData &&
    postData.filter((doc) => doc.author.id === id && doc.status === "approved");

  // Create a reference to the "users" collection in the database, with a converter function of userConverter
  const userRef = collection(database, "users").withConverter(userConverter);
  // Use the useCollectionData hook to get the data from the userRef, and destructure it into a variable called userData
  const [userData] = useCollectionData(userRef);
  //Filter the userData by checking if the uid is equal to the id from the URL and return the first match
  const user = userData && userData.filter((doc) => doc.uid === id)[0];

  return { posts, user };
};
