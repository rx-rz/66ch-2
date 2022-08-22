import {
  collection,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import React, { createContext, useContext } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { blogConverter } from "src/utils";
import { database } from "src/config/firebaseConfig";
export type Blog = {
  author: { name: string; id: string };
  tag: string;
  id: string;
  postContent: string;
  imageDownloadUrl: string;
  postTitle: string;
  ref: DocumentReference<DocumentData>;
  dateCreated: string;
  description: string;
  status: string;
  isChecked: boolean;
};
export const PostContext = createContext<PostContextProps | null>(null);
type PostContextProviderProps = {
  children: React.ReactNode;
};

type PostContextProps = {
  data: Blog[] | undefined;
};

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const postsRef = collection(database, "posts").withConverter(blogConverter);
  const [data] = useCollectionData(postsRef);

  return (
    <PostContext.Provider value={{ data }}>{children}</PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
