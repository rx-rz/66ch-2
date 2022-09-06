import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { DraftCard } from "src/components";
import { useUserContext } from "src/context";
import { draftConverter } from "src/utils";
import { database } from "src/config/firebaseConfig";
import React from "react";

export default function UserDrafts() {
  const { user } = useUserContext()!;
  const ref = collection(database, "drafts").withConverter(draftConverter);
  const [data] = useCollectionData(ref);
  const userPosts = data?.filter((doc) => doc.author.id === user?.uid);

  return (
    <div className="mx-auto md:w-11/12 w-full md:my-20 p-2">
      <h1
        className="md:text-5xl text-3xl my-8 font-bold
       dark:text-white font-pilcrow"
      >
        DRAFTS
      </h1>
      {userPosts && userPosts.length > 0 ? (
        <article className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1">
          {userPosts!.map((doc, index) => (
            <React.Fragment key={doc.id}>
              <DraftCard
                authorName={doc.author.name}
                tag={doc.tag}
                description={doc.description}
                postId={doc.id}
                dateCreated={doc.dateCreated}
                imageUrl={doc.imageDownloadUrl}
                postTitle={`Draft ${index + 1}`}
              />
            </React.Fragment>
          ))}
        </article>
      ) : (
        <p>No available drafts</p>
      )}
    </div>
  );
}
