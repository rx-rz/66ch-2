import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { BlogCard } from "src/components/Elements/BlogCard/BlogCard";
import { database } from "src/utils/firebaseConfig";
import { blogConverter } from "../../api/blogConverter";

export const PendingPosts = () => {
  const ref = collection(database, "posts").withConverter(blogConverter);
  const [data] = useCollectionData(ref);
  const posts = data?.filter((doc) => doc.status === "pending");

  return (
    <div>
      {posts && (
        <article className="grid md:grid-cols-2  lg:grid-cols-3  gap-20">
          {posts.map((doc) => (
            <Link
              to={`/post/${doc.id}/${doc.status}/${doc.author.id}`}
              key={doc.id}
              className="w-fit"
            >
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
};
