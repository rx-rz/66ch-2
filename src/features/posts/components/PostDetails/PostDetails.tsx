import { useDocumentData } from "react-firebase-hooks/firestore";
import { useUserContext } from "src/context";
import { useAdminPostApprovalOptions } from "../../api";
import { motion } from "framer-motion";
import PostComments from "./PostComments";
import PostCommentForm from "./PostCommentForm";
import { Link } from "react-router-dom";

type PostContentProps = {
  status: string;
  authorId: string;
};

export default function PostDetails({ status, authorId }: PostContentProps) {
  const { user } = useUserContext()!;
  const { postRef, acceptPost, rejectPost } = useAdminPostApprovalOptions();

  const [post, loading, error] = useDocumentData(postRef);

  return (
    <div className="mx-auto border-2 border-t-0 border-black dark:border-white dark:text-white">
      {error && <strong>{error.message}</strong>}
      {loading && <span>Loading...</span>}

      {post && (
        <main>
          <div className="md:w-10/12 w-full mx-auto  ">
            <h1 className=" w-full md:w-10/12 mx-auto my-12 text-3xl md:text-7xl text-center font-pilcrow">
              {post.postTitle}
            </h1>
            <motion.img
              src={post.imageDownloadUrl}
              alt={post.postTitle}
              className="mx-auto  border border-black dark:border-white object-cover"
              initial={{ width: "30%" }}
              animate={{ width: "80%" }}
              transition={{ duration: 0.7 }}
            />
            <div className="flex flex-wrap relative mx-auto md:w-9/12 w-full">
              <aside className="md:w-3/12 xl:w-2/12 w-full md:sticky top-16  md:border-r-black md:border-r h-fit md:h-screen md:dark:border-r-white">
                <div className="md:my-20 w-11/12 md:w-full mx-auto mt-8">
                  <Link
                    className="text-2xl font-bold font-hind text-center text-blue-600"
                    to={
                      user && user.uid !== post.author.id
                        ? `/user/${post.author.id}`
                        : "/profile"
                    }
                  >
                    {post.author.name}
                  </Link>
                  <p>{post.dateCreated}</p>
                </div>
              </aside>
              <div className="md:w-8/12 xl:w-9/12 mx-auto">
                <h3 className="text-xl font-bold font-hind md:text-2xl my-8 md:w-6/12 w-11/12 md:mx-0 mx-auto">
                  "{post.description}"
                </h3>

                <div
                  className="md:text-lg font-hind my-8 w-11/12 mx-auto md:mx-0  max-w-[66ch] editorcontent"
                  dangerouslySetInnerHTML={{ __html: post.postContent }}
                ></div>
                <PostComments />
                <PostCommentForm />
              </div>
              {status !== "null" && authorId !== "null" && (
                <div>
                  <button onClick={() => acceptPost(authorId)}>
                    Accept Post
                  </button>
                  <button onClick={() => rejectPost(authorId)}>
                    Reject Post
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
