import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "src/config/firebaseConfig";
import { Blog, blogConverter } from "src/utils";

export const usePaginatedPosts = () => {
  /* Initialize state variables for posts, lastDoc, and empty
   using the useState hook */
  const [posts, setPosts] = useState<Blog[] | null>(null);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<Blog> | null>(
    null
  );
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    /*Create a paginatedPosts variable using the
     query, collection, orderBy, where, and limit functions. 
     You can read more on how data can be called from the 
     Firestore database in the Google Firebase documetation. */
    const paginatedPosts = query(
      collection(database, "posts"),
      orderBy("dateCreated", "asc"),
      where("status", "==", "approved"),
      limit(17)
    ).withConverter(blogConverter);

    // Define a function to get paginated posts
    const getPaginatedPosts = async () => {
      // Use the getDocs function to retrieve the paginated posts and await the result
      await getDocs(paginatedPosts).then((doc) => {
        // Map the retrieved docs to an array of data
        const posts = doc.docs.map((doc) => doc.data());
        // Set the lastDoc as the last element of the docs array
        const lastDoc = doc.docs[doc.docs.length - 1];
        // Update the state variables using the setPosts and setLastDoc functions
        setPosts(posts);
        setLastDoc(lastDoc);
      });
    };
    getPaginatedPosts();
  }, []);

  const fetchMore = async () => {
    /*Use the query, collection, where, startAfter and limit 
    functions to create a newPosts variable */
    const newPosts = query(
      collection(database, "posts"),
      where("status", "==", "approved"),
      startAfter(lastDoc),
      limit(17)
    ).withConverter(blogConverter);

    // Use the getDocs function to retrieve the new posts and await the result
    await getDocs(newPosts).then((doc) => {
      // Check if the retrieved docs is empty
      const isEmpty = doc.size === 0;
      // Update the empty state variable using the setEmpty function
      setEmpty(isEmpty);
      if (!isEmpty) {
        // Map the retrieved docs to an array of data
        const posts = doc.docs.map((doc) => doc.data());
        // Set the lastDoc as the last element of the docs array
        const lastDoc = doc.docs[doc.docs.length - 1];
        /* Update the posts state variable using the setPosts function, by concatenating the previous state with the new posts */
        setPosts((listOfposts) => [...listOfposts!, ...posts]);
        setLastDoc(lastDoc);
      }
    });
  };

  return { empty, fetchMore, posts };
};
