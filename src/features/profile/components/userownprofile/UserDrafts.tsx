import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { BlogCard } from "src/components/Elements/BlogCard/BlogCard";
import { postConverter } from "src/features/posts/api/postConverter";
import { auth, database } from "src/utils/firebaseConfig";

export default function UserDrafts() {
  const [user, loading, error] = useAuthState(auth);
  const ref = collection(database, "posts").withConverter(postConverter);
  const [data] = useCollectionData(ref);
  const userPosts = data?.filter((doc) => doc.author.id === user?.uid && doc.isDraft === true) ;
  return (
    <div className="mx-auto w-11/12 md:my-20 ">
      <h1 className="md:text-3xl text-2xl mb-16 font-bold">DRAFTS</h1>
      {userPosts && (
        <article className="grid gap-24 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {userPosts.map((doc) => (
            <Link to={`/createpost/${doc.id}`} key={doc.id} className="w-fit">
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
