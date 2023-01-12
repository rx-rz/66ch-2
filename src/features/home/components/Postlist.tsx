import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { BlogCard, Button, Footer } from "src/components";
import { usePaginatedPosts } from "../api/usePaginatedPosts";

export default function Postlist() {
  const { posts, empty, fetchMore } = usePaginatedPosts();
  // Destructure the returned object from the usePaginatedPosts hook, and assign the posts, empty, and fetchMore variables

  const postsOne = posts?.slice(0, 6);
  // Create a variable 'postsOne' by slicing the first 6 elements of the 'posts' array using the optional chaining operator `?`

  const middle = posts && posts[Math.floor(posts.length * Math.random())];
  // Create a variable 'middle' that selects a random element from the 'posts' array using the Math.floor and Math.random functions, if posts is not null or undefined

  const postsTwo = posts && posts.slice(7);
  // Create a variable 'postsTwo' by slicing the elements starting from index 7 of the 'posts' array, if posts is not null or undefined

  if (postsOne && postsTwo && middle) {
    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-[95%] mx-auto ">
          {postsOne &&
            postsOne.map((doc) => (
              <BlogCard
                key={doc.id}
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
        <div className="w-[95%] mx-auto lg:min-h-[80vh] py-8 lg:block hidden">
          <div className="py-4 font-supreme w-full">
            <div className="relative">
              <Link to={`/post/${middle.id}`}>
                <img
                  src={middle.imageDownloadUrl}
                  alt={middle.postTitle}
                  className="w-full aspect-video object-cover rounded-xl"
                />
              </Link>
              <div className=" absolute  lg:bottom-4 lg:left-4 bg-white p-4 rounded-lg left-1 bottom-3  text-sm">
                <p>{middle.author.name}</p>
                <Link to={`/post/${middle.id}`} className="rounded-xl ">
                  <p className="text-md font-bold opacity-90">{middle.tag}</p>
                  <h2 className="lg:text-5xl text-3xl mb-3 font-bold">
                    {middle.postTitle}
                  </h2>
                </Link>
                <p className="opacity-90 mt-2   rounded-full ">
                  {middle.dateCreated}
                </p>
              </div>
            </div>
            <Link to={`/post/${middle.id}`}>
              <p className="text-lg font-bold opacity-90 mt-2">
                {middle.description}
              </p>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-[95%] mx-auto ">
          {postsTwo &&
            postsTwo.map((doc) => (
              <BlogCard
                key={doc.id}
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

        <Footer />
      </>
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
}
