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
  const [posts, setPosts] = useState<Blog[] | null>(null);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<Blog> | null>(
    null
  );
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const paginatedPosts = query(
      collection(database, "posts"),
      orderBy("dateCreated", "asc"),
      where("status", "==", "approved"),
      limit(17)
    ).withConverter(blogConverter);
    const getPaginatedPosts = async () => {
      await getDocs(paginatedPosts).then((doc) => {
        const posts = doc.docs.map((doc) => doc.data());
        const lastDoc = doc.docs[doc.docs.length - 1];
        setPosts(posts);
        setLastDoc(lastDoc);
      });
    };
    getPaginatedPosts();
  }, []);

  const fetchMore = async () => {
    const newPosts = query(
      collection(database, "posts"),
      orderBy("dateCreated", "asc"),
      where("status", "==", "approved"),
      startAfter(lastDoc),
      limit(17)
    ).withConverter(blogConverter);
    await getDocs(newPosts).then((doc) => {
      const isEmpty = doc.size === 0;
      setEmpty(isEmpty);
      if (!isEmpty) {
        const posts = doc.docs.map((doc) => doc.data());
        const lastDoc = doc.docs[doc.docs.length - 1];
        setPosts((listOfposts) => [...listOfposts!, ...posts]);
        setLastDoc(lastDoc);
      }
    });
  };

  return { empty, fetchMore, posts };
};
