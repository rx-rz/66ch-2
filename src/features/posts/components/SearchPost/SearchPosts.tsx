import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogCard } from "src/components/Elements/BlogCard/BlogCard";
import { usePostContext } from "src/context/postContext";
import { Blog } from "src/utils";
import search from "src/assets/search.svg";
export const SearchPosts = () => {
  const { tag } = useParams();
  const postTag = tag && tag;
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = usePostContext()!;
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const handleSearch = () => {
    data &&
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

  useEffect(() => {
    data &&
      postTag &&
      setBlogs(
        data.filter((doc) =>
          doc.tag.toLowerCase().includes(postTag!.toLowerCase())
        )
      );
  }, [postTag, data]);

  return (
    <div className="w-full min-h-screen">
      <main className="w-full py-20 flex-column  justify-center">
        <h1 className="font-pilcrow text-xl md:text-3xl dark:text-white max-w-xl">
          Search for posts by the title, author's name or tag.
        </h1>
        <div className="w-3xl max-w-3xl flex h-fit border border-white justify-center">
          <>
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 border-black dark:border-white  mx-auto p-3 font-pilcrow text-2xl w-9/12"
            />
            <button
              className="bg-secondary w-3/12 flex justify-center items-center"
              onClick={handleSearch}
            >
              <img src={search} alt="Search" width="50px" className="invert" />
            </button>
          </>
        </div>
      </main>
      {(tag ?? searchTerm) && blogs && blogs.length > 0 ? (
        <article className="grid justify-center items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-11/12 my-20 border-white border mx-auto">
          {blogs.map((doc) => (
            <BlogCard
              authorId={doc.author.id}
              postId={doc.id}
              authorName={doc.author.name}
              tag={doc.tag}
              description={doc.description}
              dateCreated={doc.dateCreated}
              imageUrl={doc.imageDownloadUrl}
              postTitle={doc.postTitle}
            />
          ))}
        </article>
      ) : (
        <p>No post matches your search term. 😶</p>
      )}
    </div>
  );
};
