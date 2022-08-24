import { BlogCard } from "src/components";
import { usePostContext } from "src/context/postContext";


export default function Postlist() {
  const { data } = usePostContext()!;
  const posts = data && data.filter((doc) => doc.status === "approved");
  return (
    <div className="mx-auto mb-20">
      {posts && (
        <article className="flex flex-wrap">
          {posts.map((doc) => (
            <article key={doc.id} className="w-fit md:w-6/12 xl:w-3/12 lg:w-4/12">
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
    </div>
  );
}
