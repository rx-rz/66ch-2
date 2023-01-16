import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export type User = {
  name: string;
  id: string;
  role: "admin" | "writer";
  photoURL: string;
  uid: string;
  ref: DocumentReference<DocumentData>;
  dateCreated: string;
  notifications: {
    message: string;
    type: "success" | "failure";
    docId: string;
    dateCreated: string;
  }[];
};

export const userConverter: FirestoreDataConverter<User> = {
  // convert the user object to a Firestore document
  toFirestore(user: WithFieldValue<User>): DocumentData {
    // return the uid and role fields
    return { uid: user.uid, role: user.role };
  },
  // convert the Firestore document to a user object
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    // get the data from the snapshot
    const data = snapshot.data(options);
    // return an object that contains all the fields of the user
    // including the name, role, photoURL, uid, ref, dateCreated, notifications, and id
    return {
      name: data.name,
      role: data.role,
      photoURL: data.photoURL,
      uid: data.uid,
      ref: snapshot.ref,
      dateCreated: data.dateCreated,
      notifications: data.notifications,
      id: snapshot.ref.id,
    };
  },
};
