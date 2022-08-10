import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { database } from "src/utils/firebaseConfig";
import { postConverter } from "../posts/api/postConverter";
export default function HomePage() {
  const ref = collection(database, "posts").withConverter(postConverter);
  const [data] = useCollectionData(ref);
  const homePageBlogPost = data && data![10];

  return (
    <main className="py-24 w-11/12 mx-auto border-b border-b-black">
      {homePageBlogPost && (
        <Link className="cursor-pointer" to={`/post/${homePageBlogPost.id}`}>
          <main className="md:flex justify-between">
            <div className=" mb-8 md:w-5/12  top-1/2 text-black">
              <div className="flex opacity-80 md:mb-8 mb-3 md:text-xl mt-6">
                <p className="mr-3 font-bold">{homePageBlogPost.author.name}</p>
                <p>{homePageBlogPost.dateCreated}</p>
              </div>
              <p className="font-medium text-4xl md:text-6xl font-Amulya max-w-sm">
                {homePageBlogPost.postTitle}
              </p>
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
  );
}
