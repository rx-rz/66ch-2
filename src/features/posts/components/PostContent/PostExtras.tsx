import { ColorRing } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { BlogCard } from "src/components";
import { usePostContext } from "src/context";

export const PostExtras = () => {
  const { id = "!!!!!!" } = useParams();
  // fetch post data
  const { data: posts } = usePostContext()!;
  // filter other posts by comparing their id with the current post id and get 3 of them
  const otherPosts =
    posts && posts.filter((post) => post.id !== id).slice(0, 3);

  if (otherPosts) {
    return (
      <div className="mx-auto my-10 md:my-20 w-[95%] mx-auto">
        <h1 className=" font-supreme  font-bold opacity-90 mb-8 md:text-3xl  text-2xl">
          Related Posts
        </h1>
        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {otherPosts &&
            otherPosts.map((post) => (
              <BlogCard
                key={post.id}
                authorName={post.author.name}
                dateCreated={post.dateCreated}
                description={post.description}
                imageUrl={post.imageDownloadUrl}
                postTitle={post.postTitle}
                tag={post.tag}
                authorId={post.author.id}
                postId={post.id}
              />
            ))}
        </article>
      </div>
    );
  } else {
    return (
      <div className="h-screen flex items-center justify-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#000", "#000", "#000", "#000", "#000"]}
        />
      </div>
    );
  }
};
