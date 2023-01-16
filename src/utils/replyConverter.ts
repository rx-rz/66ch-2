import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export type Reply = {
  reply: string;
  replyAuthor: string;
  replyAuthorId?: string;
  commentId: string;
  dateCreated: string;
  id: string;
  likes: number;
  isLiked: boolean;
  replyLikers: string[];
};

export const replyConverter: FirestoreDataConverter<Reply> = {
  // convert the reply object to a Firestore document
  toFirestore(reply: WithFieldValue<Reply>): DocumentData {
    // return only the replyAuthor field
    return { replyAuthor: reply.replyAuthor };
  },
  // convert the Firestore document to a reply object
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Reply {
    // get the data from the snapshot
    const data = snapshot.data(options);
    // return an object that contains all the fields of the reply
    // including the reply, replyAuthor, replyAuthorId, commentId, dateCreated, id, likes, isLiked and replyLikers
    return {
      reply: data.reply,
      replyAuthor: data.replyAuthor,
      replyAuthorId: data.replyAuthorId,
      commentId: data.commentId,
      dateCreated: data.dateCreated,
      id: snapshot.id,
      likes: data.likes,
      isLiked: data.isLiked,
      replyLikers: data.replyLikers,
    };
  },
};
