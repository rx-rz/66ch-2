import { Link } from "react-router-dom";
import { usePostContext } from "src/context/postContext";
export default function HomePage() {
  const { data } = usePostContext()!;
  const blogs = data && [data[0], data[1]];

  return (
    <div className="w-full border-2 border-t-0 border-tertiary text-white">
      <main className="flex flex-wrap min-h-[90vh]">
        {blogs &&
          blogs.map((blog) => (
            <div
              className="border border-black md:w-6/12 w-full px-2 bg-secondary "
              key={blog.id}
            >
              <Link to={`post/${blog?.id}`}>
                {blog && (
                  <div className="md:my-4 my-12">
                    <div>
                      <p className="text-lg md:text-2xl font-pilcrow mr-2">
                        {blog.dateCreated}
                      </p>
                      <p className=" text-xl md:text-3xl font-pilcrow">
                        {blog.author.name}
                      </p>
                    </div>
                    <img
                      className="aspect-video my-8 border border-black
                      object-cover max-h-[30vh] md:max-h-[55vh]"
                      src={blog.imageDownloadUrl}
                      alt={blog.postTitle}
                    />
                    <div>
                      <h1 className="text-3xl md:text-5xl font-pilcrow uppercase">
                        {blog.postTitle}
                      </h1>
                      <h2 className="text-lg md:text-2xl font-hind ">
                        {blog.postTitle}
                      </h2>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          ))}
      </main>
    </div>
  );
}
