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
  commentLikers: string[];
};

export const commentConverter: FirestoreDataConverter<Comment> = {
  // convert the comment object to a Firestore document
  toFirestore(comment: WithFieldValue<Comment>): DocumentData {
    // return only the commentAuthor field
    return { author: comment.commentAuthor };
  },
  // convert the Firestore document to a comment object
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Comment {
    // get the data from the snapshot
    const data = snapshot.data(options);
    // return an object that contains all the fields of the comment
    // including the comment, commentAuthor, commentAuthorId, dateCreated, postId, id, likes, isLiked, and commentLikers
    return {
      comment: data.comment,
      commentAuthor: data.commentAuthor,
      commentAuthorId: data.commentAuthorId,
      dateCreated: data.dateCreated,
      postId: data.postId,
      id: snapshot.id,
      likes: data.likes,
      isLiked: data.isLiked,
      commentLikers: data.commentLikers,
    };
  },
};
