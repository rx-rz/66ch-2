import { Link } from "react-router-dom";
import { BlogCard } from "src/components/Elements/BlogCard/BlogCard";
import { usePostContext } from "src/context/postContext";

export const PendingPosts = () => {
  const {data} = usePostContext()!
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
