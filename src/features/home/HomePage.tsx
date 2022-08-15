import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { database } from "src/utils/firebaseConfig";
import { postConverter } from "../posts/api/postConverter";
export default function HomePage() {
  const ref = collection(database, "posts").withConverter(postConverter);
  const [data] = useCollectionData(ref);
  const posts = data && data.filter((doc) => doc.isDraft !== true);
  const homePageBlogPost =
    posts && posts[Math.floor(Math.random() * posts.length)];

  return (
    <div className="w-full bg-tertiary border-b-2 border-b-primary">
      <main className="py-24 w-11/12 mx-auto ">
        {homePageBlogPost && (
          <Link className="cursor-pointer" to={`/post/${homePageBlogPost.id}`}>
            <main className="md:flex justify-between">
              <div className=" mb-8 md:w-5/12  top-1/2 text-primary">
                <div className="flex opacity-80 md:mb-8 mb-3 md:text-xl mt-6">
                  <p className="mr-3 font-bold">
                    {homePageBlogPost.author.name}
                  </p>
                  <p>{homePageBlogPost.dateCreated}</p>
                </div>
                <h1 className="font-medium text-4xl md:text-5xl lg:text-6xl  font-Amulya max-w-sm">
                  {homePageBlogPost.postTitle}
                </h1>
              </div>
              <img
                src={homePageBlogPost.imageDownloadUrl}
                alt={homePageBlogPost.postTitle}
                className="aspect-video object-cover max-h-optimal mx-auto  md:w-7/12"
              />
            </main>
          </Link>
        )}
      </main>
    </div>
  );
}
