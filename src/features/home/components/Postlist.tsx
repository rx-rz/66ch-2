import { BlogCard, Button } from "src/components";
import { usePaginatedPosts } from "../api/usePaginatedPosts";

export default function Postlist() {
  const { posts, empty, fetchMore } = usePaginatedPosts();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-[95%] mx-auto ">
        {posts &&
          posts.map((doc) => (
            <BlogCard
              authorName={doc.author.name}
              authorId={doc.author.id}
              postId={doc.id}
              tag={doc.tag}
              description={doc.description}
              dateCreated={doc.dateCreated}
              imageUrl={doc.imageDownloadUrl}
              postTitle={doc.postTitle}
            />
          ))}
      </div>
      <div className="w-[95%] mx-auto flex justify-center">
        {!empty && (
          <Button
            handleClick={fetchMore}
            className="p-4 w-fit bg-black text-white text-lg font-bold rounded-xl font-supreme mx-auto my-8"
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
}
