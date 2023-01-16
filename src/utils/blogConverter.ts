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
  status: string;
  isChecked: boolean;
};

export const blogConverter: FirestoreDataConverter<Blog> = {
  // convert the blog object to a Firestore document
  toFirestore(blog: WithFieldValue<Blog>): DocumentData {
    // return only the author field
    return { author: blog.author };
  },
  // convert the Firestore document to a blog object
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Blog {
    // get the data from the snapshot
    const data = snapshot.data(options);
    // return an object that contains all the fields of the blog
    // including the author's name and id, the tag, the id, the postContent, postTitle, dateCreated, and other fields
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
      status: data.status,
      isChecked: data.isChecked,
    };
  },
};
