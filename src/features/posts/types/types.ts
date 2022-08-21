import { DocumentData, DocumentReference } from "firebase/firestore";

export type CreatePostFormValues = {
    postContent: any
    postTitle: string
}
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
    status: string,
    isChecked: boolean
  
  };
  