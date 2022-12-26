import { Link } from "react-router-dom";
import { usePostContext } from "src/context/postContext";
export default function HomePage() {
  const { data } = usePostContext()!;
  const blogOne = data && data[9];
  const blogs = data && data.slice(3, 6);

  return (
    <div className="w-full  ">
      <main className="flex flex-wrap min-h-[90vh] md:mx-8 mx-3 mt-4">
        <div
          className=" md:w-6/12 w-full px-2 bg-secondary max-h-[828px]
         border border-black mb-8 md:mb-0 "
        >
          {blogOne && (
            <Link to={`post/${blogOne?.id}`}>
              <div className="md:my-4 my-12 md:mx-6 mx-3 text-white">
                <div className="flex items-baseline opacity-90">
                  <p className=" text-md md:text-2xl font-pilcrow mr-2">
                    {blogOne.author.name}
                  </p>
                  <p className="text-sm md:text-xl font-pilcrow ">
                    {blogOne.dateCreated}
                  </p>
                </div>
                <img
                  className="aspect-video mt-1 mb-4
                      object-cover max-h-[30vh] md:max-h-[55vh] w-full"
                  src={blogOne.imageDownloadUrl}
                  alt={blogOne.postTitle}
                />
                <div>
                  <h1 className="text-2xl md:text-4xl font-pilcrow  uppercase">
                    {blogOne.postTitle}
                  </h1>
                  <h2 className="text-md md:text-xl  opacity-90 font-hind">
                    {blogOne.description}
                  </h2>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="md:w-6/12 w-full px-2 ">
          {blogs &&
            blogs.map((blog) => (
              <Link to={`/post/${blog.id}`} key={blog.id}>
                <article className="md:h-[271px] md:mb-2 mb-8  overflow-clip  md:flex">
                  <img
                    src={blog.imageDownloadUrl}
                    alt=""
                    className="md:w-4/12 w-full aspect-video max-h-[271px]
                      h-full object-cover border border-black 
                       md:mx-8 mr-2 min-w-[200px]"
                  />
                  <div className="font-pilcrow  max-w-md mt-3 text-ellipsis">
                    <div className="flex opacity-80">
                      <p className="mr-2">{blog.author.name}</p>
                      <p>{blog.dateCreated}</p>
                    </div>
                    <h1 className="md:text-3xl text-2xl my-2 uppercase">
                      {blog.postTitle}
                    </h1>
                    <p className="opacity-80  font-hind">{blog.description}</p>
                  </div>
                </article>
              </Link>
            ))}
        </div>
      </main>
    </div>
  );
}
