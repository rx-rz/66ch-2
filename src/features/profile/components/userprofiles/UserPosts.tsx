import { Link } from "react-router-dom";
import { BlogCard } from "src/components/Elements/BlogCard/BlogCard";
import { useViewProfile } from "../../api/useViewProfile";

export default function UserPosts() {
  const { posts } = useViewProfile();
  return (
    <div className="mx-auto md:w-11/12 w-full md:my-20 ">
    <h1 className="md:text-5xl text-3xl font-pilcrow my-8 dark:text-white  font-bold">ARTICLES</h1>
    {posts && posts.length > 0 ? (
      <article className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1">
        {posts!.map((doc) => (
          <BlogCard
            authorName={doc.author.name}
            authorId={doc.author.id}
            tag={doc.tag}
            description={doc.description}
            dateCreated={doc.dateCreated}
            imageUrl={doc.imageDownloadUrl}
            postTitle={doc.postTitle}
            postId={doc.author.id}
          />
        ))}
      </article>
    ) : (
      <p>No available posts</p>
    )}
  </div>
  );
}
