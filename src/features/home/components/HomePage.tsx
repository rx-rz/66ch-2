import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { database } from "src/utils/firebaseConfig";
import { postConverter } from "src/features/home/api/postConverter";
export default function HomePage() {
  const ref = collection(database, "posts").withConverter(postConverter);
  const [data] = useCollectionData(ref);
  const posts = data && data.filter((doc) => doc.isDraft !== true);
  const homePageBlogPost =
    posts && posts[Math.floor(Math.random() * posts.length)];

  return (
    <div className="w-full bg-primary border-b border-b-tertiary">
      <main className="pt-24 md:pt-48 mx-auto relative">
        {homePageBlogPost && (
          <Link className="cursor-pointer" to={`/post/${homePageBlogPost.id}`}>
            <div className="my-6">
              <div className="flex md:text-3xl w-11/12 font-cormorant font-bold">
                <h2 className="mr-4 ml-1 font-extrabold">{homePageBlogPost.author.name}</h2>
                <h2>{homePageBlogPost.dateCreated}</h2>
              </div>
              <h1 className="font-medium xl:text-8xl lg:text-6xl md:text-5xl text-4xl">
                {homePageBlogPost.postTitle}
              </h1>
            </div>
            <img
              src={homePageBlogPost.imageDownloadUrl}
              alt={homePageBlogPost.postTitle}
              className="max-h-[80vh] w-full object-cover"
            />
          </Link>
        )}
      </main>
    </div>
  );
}
