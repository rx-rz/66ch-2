import { collection, doc } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, database } from "src/utils/firebaseConfig";
export default function HomePage() {
  const postsRef = collection(database, "posts");
  const [value, loading, error] = useCollection(postsRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  // const [user, loading, error] = useAuthState(auth);
  
    return (
      <div>
      </div>
    );

}
