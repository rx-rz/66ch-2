import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { DraftCard } from "src/components";
import { useUserContext } from "src/context";
import { draftConverter } from "src/utils";
import { database } from "src/config/firebaseConfig";

export default function UserDrafts() {
  const { user } = useUserContext()!;
  const ref = collection(database, "drafts").withConverter(draftConverter);
  const [data] = useCollectionData(ref);
  const userPosts = data?.filter((doc) => doc.author.id === user?.uid);

  return (
    <div className="mx-auto w-11/12 md:my-20 ">
      <h1 className="md:text-3xl text-2xl mb-16 font-bold">DRAFTS</h1>
      {userPosts && userPosts.length > 0 ? (
        <article className="flex flex-wrap">
          {userPosts!.map((doc, index) => (
            <DraftCard
              authorName={doc.author.name}
              tag={doc.tag}
              description={doc.description}
              dateCreated={doc.dateCreated}
              imageUrl={doc.imageDownloadUrl}
              postTitle={`Draft ${index + 1}`}
            />
          ))}
        </article>
      ) : (
        <p>No available drafts</p>
      )}
    </div>
  );
}
