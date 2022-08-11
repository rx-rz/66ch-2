import { collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { BlogCard } from "src/components/Elements/BlogCard/BlogCard";
import { database } from "src/utils/firebaseConfig";
import { postConverter } from "../../api/postConverter";
import { Blog } from "../../api/postConverter";

export const SearchPosts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const ref = collection(database, "posts").withConverter(postConverter);
  const [data, loading] = useCollectionData(ref);
  const [blogs, setBlogs] = useState<Blog[] | null>(null);

  const handleSearch = () => {
    if (data && searchTerm) {
      setBlogs(
        data.filter(
          (doc) =>
            doc.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.postTitle.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };
  //   useEffect(() => {
  //     if (data && searchTerm) {
  //       setBlogs(
  //         data.filter(
  //           (doc) =>
  //             doc.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //             doc.postTitle.toLowerCase().includes(searchTerm.toLowerCase())
  //         )
  //       );
  //     }
  //   }, [data, searchTerm]);

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
      {loading && <p>Loading...</p>}
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
      ): <p>No post matches your search term. 😶</p>}
    </div>
  );
};
