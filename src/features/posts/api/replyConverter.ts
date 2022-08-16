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
  replyAuthorId?: string
  commentId: string;
  dateCreated: string;
  id: string;
  likes: number;
  isLiked: boolean;
  replyLikers: string[]
};

export const replyConverter: FirestoreDataConverter<Reply> = {
  toFirestore(reply: WithFieldValue<Reply>): DocumentData {
    return { replyAuthor: reply.replyAuthor };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Reply {
    const data = snapshot.data(options);
    return {
      reply: data.reply,
      replyAuthor: data.replyAuthor,
      commentId: data.commentId,
      dateCreated: data.dateCreated,
      id: snapshot.id,
      likes: data.likes,
      isLiked: data.isLiked,
      replyLikers: data.replyLikers
    };
  },
};
