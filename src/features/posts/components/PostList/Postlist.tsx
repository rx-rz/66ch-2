import { BlogCard, Button } from "src/components";
import { usePaginatedPosts } from "../../api/usePaginatedPosts";

export default function Postlist() {
  const { posts, empty, fetchMore } = usePaginatedPosts();

  return (
    <div className="mx-auto ">
      {posts && (
        <article className="flex flex-wrap">
          {posts.map((doc) => (
            <article
              key={doc.id}
              className="w-fit md:w-6/12 xl:w-3/12 lg:w-4/12"
            >
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
            </article>
          ))}
        </article>
      )}
      <div className="my-4 md:mt-8 m-2 mx-auto flex justify-center">
        {!empty && (
          <Button handleClick={fetchMore} variant="authPrimary">
            Fetch More
          </Button>
        )}
      </div>
    </div>
  );
}
