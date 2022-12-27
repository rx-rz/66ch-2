import { PendingBlogCard } from "src/components";
import { usePostContext } from "src/context/postContext";
import larry from "src/assets/larry.svg";
import React from "react";
import { useUserContext } from "src/context";

export const PendingPosts = () => {
  const { data } = usePostContext()!;
  const { user } = useUserContext()!;
  const posts =
    data && user && user.role === "admin"
      ? data?.filter((doc) => doc.status === "pending")
      : data?.filter(
          (doc) => doc.status === "pending" && doc.author.id === user?.uid
        );

  return (
    <div>
      {posts && posts.length > 0 ? (
        <>
          <h1 className="md:text-5xl text-2xl font-supreme font-bold text-center opacity-90 m-2  my-4 md:my-8">
            Pending Posts
          </h1>
          <article className="grid md:grid-cols-2  lg:grid-cols-3  gap-20 m-2">
            {posts.map((doc) => (
              <React.Fragment key={doc.id}>
                <PendingBlogCard
                  authorName={doc.author.name}
                  authorId={doc.author.id}
                  postId={doc.id}
                  status={doc.status}
                  description={doc.description}
                  dateCreated={doc.dateCreated}
                  imageUrl={doc.imageDownloadUrl}
                  postTitle={doc.postTitle}
                />
              </React.Fragment>
            ))}
          </article>
        </>
      ) : (
        <div className="flex flex-col text-center w-full justify-center">
          <img
            src={larry}
            alt="You have no pending posts."
            className="max-h-[80vh] dark:invert"
          />
          <h1 className="text-2xl md:text-4xl  font-supreme font-bold">
            Uh oh. You have no pending posts.
          </h1>
        </div>
      )}
    </div>
  );
};
