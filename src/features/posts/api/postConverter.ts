import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

// type Blog = {
//   author: {name: string, id: string}
//   tag: string;
//   postContent: string;
//   imageDownloadUrl: string;
//   postTitle: string
//   dateCreated: string
//   title: string;
// };

// const postConverter: FirestoreDataConverter<Blog> = {
//   toFirestore(blog: WithFieldValue<Blog>): DocumentData {
//     return { author: blog.author, title: blog.title };
//   },
//   fromFirestore(
//     snapshot: QueryDocumentSnapshot,
//     options: SnapshotOptions
//   ): Blog {
//     const data = snapshot.data(options);

//   },
// };
