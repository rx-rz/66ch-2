import { Link } from "react-router-dom";
import { usePostContext } from "src/context/postContext";
export default function HomePage() {
  const { data } = usePostContext()!;
  const blogOne = data && data[data.length - 2];
  const blogTwo = data && data[data.length - 7];
  const blogThree = data && data[data.length - 1];

  if (blogOne && blogTwo && blogThree) {
    return (
      <main className="w-full min-h-screen">
        <div className="w-[95%] mx-auto mt-12 font-supreme font-bold ">
          <div className="flex flex-wrap justify-between">
            <div className="w-7/12 h-full rounded-xl">
              <Link to={`/post/${blogOne.id}`} className="rounded-xl">
                <p className="text-md font-bold opacity-90">{blogOne?.tag}</p>
                <h2 className="text-5xl mb-3 font-bold">{blogOne.postTitle}</h2>
                <div className="relative">
                  <img
                    src={blogOne.imageDownloadUrl}
                    alt={blogOne.postTitle}
                    className="w-full aspect-square max-h-[80vh] object-cover rounded-xl"
                  />
                  <div className=" absolute bottom-4 left-4">
                    <p className="opacity-90  bg-white rounded-full p-2">
                      {blogOne.author.name}
                    </p>
                    <p className="opacity-90 mt-2  bg-white rounded-full p-2">
                      {blogOne.dateCreated}
                    </p>
                  </div>
                </div>
                <p className="text-xl font-bold opacity-90 mt-2">
                  {blogOne.description}
                </p>
              </Link>
            </div>
            <div className="w-[1px] border border-black"></div>
            <div className="w-4/12 h-full  flex-col  flex">
              <Link to={`/post/${blogTwo.id}`} className="rounded-xl pb-12">
                <p className="text-md font-bold opacity-90">{blogTwo?.tag}</p>
                <h2 className="text-3xl mb-3 font-bold">{blogTwo.postTitle}</h2>
                <div className="relative">
                  <img
                    src={blogTwo.imageDownloadUrl}
                    alt={blogTwo.postTitle}
                    className="w-full aspect-video object-cover rounded-xl"
                  />
                  <div className=" absolute bottom-4 left-4 text-sm" >
                    <p className="opacity-90  bg-white rounded-full p-2">
                      {blogTwo.author.name}
                    </p>
                    <p className="opacity-90 mt-2  bg-white rounded-full p-2">
                      {blogTwo.dateCreated}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold opacity-90 mt-2">
                  {blogTwo.description}
                </p>
              </Link>
              <Link to={`/post/${blogThree.id}`} className="rounded-xl pt-4">
                <p className="text-md font-bold opacity-90">{blogThree?.tag}</p>
                <h2 className="text-3xl mb-3 font-bold">{blogThree.postTitle}</h2>
                <div className="relative">
                  <img
                    src={blogThree.imageDownloadUrl}
                    alt={blogThree.postTitle}
                    className="w-full aspect-video object-cover rounded-xl"
                  />
                  <div className=" absolute bottom-4 left-4 text-sm" >
                    <p className="opacity-90  bg-white rounded-full p-2">
                      {blogThree.author.name}
                    </p>
                    <p className="opacity-90 mt-2  bg-white rounded-full p-2">
                      {blogThree.dateCreated}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold opacity-90 mt-2">
                  {blogThree.description}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return <p>Loading...</p>;
}
