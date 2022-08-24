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
  id: string
  role: "admin" | "writer";
  photoURL: string;
  uid: string;
  ref: DocumentReference<DocumentData>;
  dateCreated: string;
  notifications: { message: string, type: "success" | "failure", docId: string }[] 
};

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: WithFieldValue<User>): DocumentData {
    return { uid: user.uid, role: user.role };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options);
    return {
      name: data.name,
      role: data.role,
      photoURL: data.photoURL,
      uid: data.uid,
      ref: snapshot.ref,
      dateCreated: data.dateCreated,
      notifications: data.notifications,
      id: snapshot.ref.id
    };
  },
};
