import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { BlogCard } from "src/components/Elements/BlogCard/BlogCard";
import { database } from "src/utils/firebaseConfig";
export default function Postlist() {
  const postsRef = collection(database, "posts");
  const [value, loading, error] = useCollection(postsRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return (
    <div className="mx-auto w-11/12 my-20">
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <article className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {value.docs.map((doc) => (
            <Link to={`/post/${doc.id}`} key={doc.id} className="w-fit">
              <BlogCard
                authorName={doc.data().author.name}
                tag={doc.data().tags}
                description={doc.data().description}
                dateCreated={doc.data().dateCreated}
                imageUrl={doc.data().imageDownloadUrl}
                postTitle={doc.data().postTitle}
              />
            </Link>
          ))}
        </article>
      )}
      </div>
  );
}
