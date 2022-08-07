import { collection } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { database } from "src/utils/firebaseConfig";
export default function Postlist() {
  const postsRef = collection(database, "posts");
  const [value, loading, error] = useCollection(postsRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return (
    <div>
      <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <span>
            {value.docs.map((doc) => (
              <Link to={`post/${doc.id}`} key={doc.id} className="block">
                {doc.data().author.name}
              </Link>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}
