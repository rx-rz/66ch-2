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

      {value && (
        <div >
          <div
          className="[&>p]:text-blue-700 [&>h1]:text-3xl"
            dangerouslySetInnerHTML={{ __html: value.data()!.postContent }}
          ></div>
        </div>
      )}
    </div>
  );
}
