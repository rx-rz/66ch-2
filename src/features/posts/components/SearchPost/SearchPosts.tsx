import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogCard } from "src/components/Elements/BlogCard/BlogCard";
import { usePostContext } from "src/context/postContext";
import { Blog } from "src/utils";
import search from "src/assets/search.svg";
import larry from "src/assets/larry.svg";

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
            (doc.status === "approved" &&
              doc.author.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            doc.description.toLowerCase().includes(searchTerm) ||
            doc.tag.toLowerCase().includes(searchTerm)
        )
      );
  };

  useEffect(() => {
    data &&
      postTag &&
      setBlogs(
        data.filter(
          (doc) =>
            doc.status === "approved" &&
            doc.tag.toLowerCase().includes(postTag!.toLowerCase())
        )
      );
  }, [postTag, data]);

  return (
    <div className="w-full min-h-screen">
      <main className="w-fit py-20 flex-column mx-auto justify-center">
        <h1
          className="font-pilcrow text-xl md:text-3xl 
        dark:text-white max-w-xl text-center my-4"
        >
          Search for posts by the title, author's name or tag.
        </h1>
        <div className="flex h-fit border border-white justify-center mx-2 md:mx-0">
          <>
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 border-black dark:border-white
                mx-auto p-3 font-pilcrow text-2xl w-9/12"
            />
            <button
              className="bg-secondary w-3/12 flex justify-center 
              items-center border-2 border-black dark:border-white"
              onClick={handleSearch}
            >
              <img src={search} alt="Search" width="50px" className="invert" />
            </button>
          </>
        </div>
      </main>
      {(tag ?? searchTerm) && blogs && blogs.length > 0 ? (
        <article className="flex flex-wrap justify-center mb-12">
          {blogs.map((doc) => (
            <article
              key={doc.id}
              className="w-fit md:w-6/12 xl:w-3/12 lg:w-4/12"
            >
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
            </article>
          ))}
        </article>
      ) : (
        <div className="flex flex-col text-center w-full justify-center">
          <h1 className="text-2xl md:text-4xl dark:text-white font-pilcrow">
            Uh oh. No posts match your search term
          </h1>
          <img
            src={larry}
            alt="You have no pending posts."
            className="max-h-[80vh] dark:invert"
          />
        </div>
      )}
    </div>
  );
};
