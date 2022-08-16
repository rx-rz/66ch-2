import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export type Comment = {
  comment: string;
  commentAuthor: string;
  commentAuthorId: string;
  dateCreated: string;
  postId: string;
  id: string;
  likes: number;
  isLiked: boolean;
  commentLikers: string[]
};

export const commentConverter: FirestoreDataConverter<Comment> = {
  toFirestore(comment: WithFieldValue<Comment>): DocumentData {
    return { author: comment.commentAuthor };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Comment {
    const data = snapshot.data(options);
    return {
      comment: data.comment,
      commentAuthor: data.commentAuthor,
      commentAuthorId: data.commentAuthorId,
      dateCreated: data.dateCreated,
      postId: data.postId,
      id: snapshot.id,
      likes: data.likes,
      isLiked: data.isLiked,
      commentLikers: data.commentLikers
    };
  },
};
