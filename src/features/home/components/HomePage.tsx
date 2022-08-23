import { Link } from "react-router-dom";
import { usePostContext } from "src/context/postContext";
export default function HomePage() {
  const { data } = usePostContext()!;
  const blogPostOne = data && data[9];
  const blogPostTwo = data && data[8];

  return (
    <div className="w-full border-2 border-t-0 border-tertiary">
      <main className="flex flex-wrap min-h-[90vh]">
        <div className="border border-black md:w-6/12 w-full px-2 bg-yellow-300 ">
          <Link to={`post/${blogPostOne?.id}`}>
          {blogPostOne && (
            <div className="md:my-4 my-12">
              <div>
                <p className="text-lg md:text-2xl font-pilcrow mr-2">
                  {blogPostOne.dateCreated}
                </p>
                <p className=" text-xl md:text-3xl font-pilcrow">
                  {blogPostOne.author.name}
                </p>
              </div>
              <img
                className="aspect-video my-8 border border-black"
                src={blogPostOne.imageDownloadUrl}
                alt={blogPostOne.postTitle}
              />
              <div>
                <h1 className="text-3xl md:text-5xl font-pilcrow uppercase">{blogPostOne.postTitle}</h1>
                <h2 className="text-lg md:text-2xl font-hind ">{blogPostOne.postTitle}</h2>
              </div>
            </div>
          )}
          </Link>
        </div>
      
        <div className="border border-black md:w-6/12 w-full px-2 bg-yellow-300 ">
          <Link to={`post/${blogPostTwo?.id}`}>
          {blogPostTwo && (
            <div className="md:my-4 my-12">
              <div>
                <p className="text-lg md:text-2xl font-pilcrow mr-2">
                  {blogPostTwo.dateCreated}
                </p>
                <p className=" text-xl md:text-3xl font-pilcrow">
                  {blogPostTwo.author.name}
                </p>
              </div>
              <img
                className="aspect-video my-8 border border-black"
                src={blogPostTwo.imageDownloadUrl}
                alt={blogPostTwo.postTitle}
              />
              <div>
                <h1 className="text-3xl md:text-5xl font-pilcrow uppercase">{blogPostTwo.postTitle}</h1>
                <h2 className="text-lg md:text-2xl font-hind ">{blogPostTwo.postTitle}</h2>
              </div>
            </div>
          )}
          </Link>
        </div>
      
      </main>
    </div>
  );
}
