import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export type Draft = {
  author: { name: string; id: string };
  tag: string;
  id: string;
  postContent: string;
  imageDownloadUrl: string;
  postTitle: string;
  ref: DocumentReference<DocumentData>;
  dateCreated: string;
  description: string;
};

export const draftConverter: FirestoreDataConverter<Draft> = {
  // convert the draft object to a Firestore document
  toFirestore(draft: WithFieldValue<Draft>): DocumentData {
    // return only the author field
    return { author: draft.author };
  },
  // convert the Firestore document to a draft object
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Draft {
    // get the data from the snapshot
    const data = snapshot.data(options);
    // return an object that contains all the fields of the draft
    // including the author, tag, id, postContent, postTitle, dateCreated, imageDownloadUrl, ref, and description
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
    };
  },
};
