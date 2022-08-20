import { Link } from "react-router-dom";
import { BlogCard } from "src/components/Elements/BlogCard/BlogCard";
import { usePostContext } from "src/context/postContext";


export default function Postlist() {
  const { data } = usePostContext()!;
  const posts = data && data.filter((doc) => doc.status === "approved");
  return (
    <div className="mx-auto w-11/12 my-20">
      {posts && (
        <article className="grid md:grid-cols-2  lg:grid-cols-3  gap-20">
          {posts.map((doc) => (
            <Link to={`/post/${doc.id}`} key={doc.id} className="w-fit">
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
}
