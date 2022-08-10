import { collection } from "firebase/firestore";

import {  useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { BlogCard } from "src/components/Elements/BlogCard/BlogCard";
import {  database } from "src/utils/firebaseConfig";
import { postConverter } from "../../api/postConverter";

export default function Postlist() {
  const ref = collection(database, "posts").withConverter(postConverter);
  const [data, loading] = useCollectionData(ref);

  return (
    <div className="m-auto w-11/12 my-20">
      {loading && <p>Loading...</p>}
      {data && (
        <article className="grid md:gap-20 lg:gap-28  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((doc) => (
            <Link to={`/post/${doc.id}`} key={doc.id} className="w-fit">
              <BlogCard
                authorName={doc.author.name}
                tag={doc.tag}
                description={doc.description}
                dateCreated={doc.dateCreated}
                imageUrl={doc.imageDownloadUrl}
                postTitle={doc.postTitle}
              />
            </Link>
          ))}
        </article>
      )}
      </div>
  );
}
