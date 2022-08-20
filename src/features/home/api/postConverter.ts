import {
    DocumentData,
    DocumentReference,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue,
  } from "firebase/firestore";
  
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
    status: string
  };
  
  export const postConverter: FirestoreDataConverter<Blog> = {
    toFirestore(blog: WithFieldValue<Blog>): DocumentData {
      return { author: blog.author };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Blog {
      const data = snapshot.data(options);
      return {
        author: { name: data.author.name, id: data.author.id },
        tag: data.tag,
        id: snapshot.id,
        postContent: data.postContent,
        postTitle: data.postTitle,
        dateCreated: data.dateCreated,
        imageDownloadUrl: data.imageDownloadUrl,
        ref: snapshot.ref,
        description: data.description,
        status: data.status
      };
    },
  };
  