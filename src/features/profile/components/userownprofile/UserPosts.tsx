import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { BlogCard } from "src/components/Elements/BlogCard/BlogCard";
import { postConverter } from "src/features/posts/api/postConverter";
import { auth, database } from "src/utils/firebaseConfig";

export default function UserPosts() {
  const [user, loading, error] = useAuthState(auth);
  const ref = collection(database, "posts").withConverter(postConverter);
  const [data] = useCollectionData(ref);
  const userPosts = data?.filter((doc) => doc.author.id === user?.uid);
  return (
    <div className="mx-auto w-11/12 my-20">
      <h1 className="text-3xl mb-16 font-bold">ARTICLES</h1>
      {userPosts && (
        <article className="grid gap-24 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {userPosts.map((doc) => (
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
