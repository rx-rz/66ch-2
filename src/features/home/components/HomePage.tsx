import { Link } from "react-router-dom";
import { usePostContext } from "src/context/postContext";
export default function HomePage() {
  const { data } = usePostContext()!;
  const homePageBlogPost = data && data[data.length - 1];

  return (
    <div className="w-full bg-yellow-300 border-b border-b-tertiary">
      <main className="pt-24 md:pt-48 mx-auto relative">
        {homePageBlogPost && (
          <Link className="cursor-pointer" to={`/post/${homePageBlogPost.id}`}>
            <div className="my-6">
              <div className="flex md:text-3xl w-11/12 font-cormorant font-bold">
                <h2 className="mr-4 ml-1 font-extrabold">
                  {homePageBlogPost.author.name}
                </h2>
                <h2>{homePageBlogPost.dateCreated}</h2>
              </div>
              <h1 className="font-medium xl:text-8xl lg:text-6xl md:text-5xl text-4xl">
                {homePageBlogPost.postTitle}
              </h1>
            </div>
            <img
              src={homePageBlogPost.imageDownloadUrl}
              loading="eager"
              alt={homePageBlogPost.postTitle}
              className="max-h-[80vh] h-[60vh] md:h-[80vh] w-full object-cover"
            />
          </Link>
        )}
      </main>
    </div>
  );
}
