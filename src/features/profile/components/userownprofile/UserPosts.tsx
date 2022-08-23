import { Link } from "react-router-dom";
import { BlogCard } from "src/components/Elements/BlogCard/BlogCard";
import { usePostContext, useUserContext } from "src/context";

export default function UserPosts() {
  const { user } = useUserContext()!;
  const { data } = usePostContext()!;
  const userPosts = data?.filter((doc) => doc.author.id === user?.uid);
  return (
    <div className="mx-auto w-11/12 md:my-20 ">
      <h1 className="md:text-3xl text-2xl mb-16 font-bold">ARTICLES</h1>
      {userPosts && userPosts.length > 0 ? (
        <article className="flex flex-wrap">
          {userPosts!.map((doc) => (
            <Link to={`/post/${doc.id}`} key={doc.id} className="w-fit md:w-6/12 xl:w-3/12 lg:w-4/12">
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
      ) : (
        <p>No available posts</p>
      )}
    </div>
  );
}
