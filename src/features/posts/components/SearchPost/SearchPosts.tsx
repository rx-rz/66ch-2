import { useState } from "react";
import { Link } from "react-router-dom";
import { BlogCard } from "src/components/Elements/BlogCard/BlogCard";
import { usePostContext } from "src/context/postContext";
import { Blog } from "src/utils";

export const SearchPosts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = usePostContext()!;
  const [blogs, setBlogs] = useState<Blog[] | null>(null);

  const handleSearch = () => {
    data &&
      searchTerm &&
      setBlogs(
        data.filter(
          (doc) =>
            (doc.postTitle !== undefined &&
              doc.author.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            doc.description.toLowerCase().includes(searchTerm)
        )
      );
  };

  return (
    <div className="min-h-screen">
      <main className="w-full bg-yellow-200 h-96 flex items-center justify-center">
        <div className="w-full flex flex-col">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-b border-black w-9/12 md:w-3/12 mx-auto"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </main>
      {blogs && blogs.length > 0 ? (
        <article className="grid md:gap-24 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-auto w-11/12 my-20">
          {blogs.map((doc) => (
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
      ) : (
        <p>No post matches your search term. 😶</p>
      )}
    </div>
  );
};
