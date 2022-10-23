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
        className="md:text-4xl text-3xl my-8 font-bold
       dark:text-white font-pilcrow"
      >
        DRAFTS
      </h1>
      {userPosts && userPosts.length > 0 ? (
        <article className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1">
          {userPosts!.map((doc) => (
            <React.Fragment key={doc.id}>
              <DraftCard
                authorName={doc.author.name}
                tag={doc.tag}
                description={doc.description}
                postId={doc.id}
                dateCreated={doc.dateCreated}
                imageUrl={doc.imageDownloadUrl}
                postTitle={doc.postTitle}
              />
            </React.Fragment>
          ))}
        </article>
      ) : (
        <p className="dark:text-white">No available drafts</p>
      )}
    </div>
  );
}
