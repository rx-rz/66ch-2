import { useParams } from "react-router-dom";
import { BlogCard } from "src/components";
import { usePostContext } from "src/context";

export const PostExtras = () => {
  const { id = "!!!!!!" } = useParams();
  const { data: posts } = usePostContext()!;
  const otherPosts =
    posts && posts.filter((post) => post.id !== id).slice(0, 3);
  return (
    <div className="mx-auto my-10 md:my-20">
      <h1 className=" font-pilcrow md:text-3xl my-3 mx-1 text-2xl">
        Related Posts
      </h1>
      {otherPosts && (
        <article className="flex flex-wrap justify-evenly">
          {otherPosts.map((post) => (
            <article
              className="w-fit md:w-6/12 xl:w-4/12"
              key={post.id}
            >
              <BlogCard
                authorName={post.author.name}
                dateCreated={post.dateCreated}
                description={post.description}
                imageUrl={post.imageDownloadUrl}
                postTitle={post.postTitle}
                tag={post.tag}
                authorId={post.author.id}
                postId={post.id}
              />
            </article>
          ))}
        </article>
      )}
    </div>
  );
};
