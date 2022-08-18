import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { BlogCard } from "src/components/Elements/BlogCard/BlogCard";
import { draftConverter } from "src/features/posts/api/draftConverter";
import { auth, database } from "src/utils/firebaseConfig";

export default function UserDrafts() {
  const [user] = useAuthState(auth);
  const ref = collection(database, "drafts").withConverter(draftConverter);
  const [data] = useCollectionData(ref);
  const userPosts = data?.filter((doc) => doc.author.id === user?.uid);
  return (
    <div className="mx-auto w-11/12 md:my-20 ">
      <h1 className="md:text-3xl text-2xl mb-16 font-bold">DRAFTS</h1>
      {userPosts && userPosts.length > 0 ? (
        <article className="grid gap-24 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {userPosts!.map((doc, index) => (
            <Link to={`/createpost/${doc.id}`} key={doc.id} className="w-fit">
              <BlogCard
                authorName={doc.author.name}
                tag={doc.tag}
                description={doc.description}
                dateCreated={doc.dateCreated}
                imageUrl={doc.imageDownloadUrl}
                postTitle={`Draft ${index + 1}`}
              />
            </Link>
          ))}
        </article>
      ) : (
        <p>No available drafts</p>
      )}
    </div>
  );
}
