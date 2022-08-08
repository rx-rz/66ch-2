import { collection } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { ProductCard } from "src/components/Elements/BlogCard/BlogCard";
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
          <section className="flex flex-wrap">
            {value.docs.map((doc) => (
              <Link
                to={`/post/${doc.id}`}
                key={doc.id}
                className="w-fit"
              >
                <ProductCard
                  authorName={doc.data().author.name}
                  dateCreated={doc.data().dateCreated}
                  imageUrl={doc.data().imageDownloadUrl}
                  postTitle={doc.data().postTitle}
                />
              </Link>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
