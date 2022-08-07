import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { database } from "src/utils/firebaseConfig";

export default function PostDetails() {
  const { id } = useParams();
  const postRef = doc(database, "posts", id!);
  const [value, loading, error] = useDocument(postRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Document: Loading...</span>}
      {value && <span>Document: {JSON.stringify(value.data())}</span>}
    </div>
  );
}
