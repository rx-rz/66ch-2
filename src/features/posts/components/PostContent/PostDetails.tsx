import { useUserContext } from "src/context";
import { useAdminPostApprovalOptions } from "../../api";
import { motion } from "framer-motion";
import PostComments from "./PostComments";
import PostCommentForm from "./PostCommentForm";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button } from "src/components";
import { ShareButtons } from "./ShareButtons";
import { useEffect } from "react";

type PostContentProps = {
  authorId: string;
};

export default function PostDetails({ authorId }: PostContentProps) {
  const { user } = useUserContext()!;
  const { id } = useParams();
  const { post, loading, error, acceptPost, rejectPost } =
    useAdminPostApprovalOptions();
  const location = useLocation();

  useEffect(() => {
    document.title = `${post?.postTitle} by ${post?.author.name}`;
  }, [post?.postTitle, post?.author]);

  return (
    <div className="mx-auto   dark:text-white">
      {error && <strong>{error.message}</strong>}
      {loading && <span>Loading...</span>}

      {post && (
        <main>
          <div className="md:w-10/12 w-full mx-auto ">
            <h1
              className=" w-full md:w-10/12 mx-auto my-12 text-3xl
             md:text-7xl text-center font-pilcrow"
            >
              {post.postTitle}
            </h1>
            <motion.img
              src={post.imageDownloadUrl}
              alt={post.postTitle}
              className="mx-auto  border border-black dark:border-white
               object-cover aspect-video max-h-[40vh]  md:max-h-[70vh]"
              initial={{ width: "30%" }}
              animate={{ width: "95%" }}
              transition={{ duration: 0.7 }}
            />
            <div className="flex flex-wrap relative mx-auto md:w-9/12 w-full">
              <aside
                className="md:w-3/12 xl:w-2/12 w-full md:sticky top-16
              md:border-r-black md:border-r h-fit md:h-screen
              md:dark:border-r-white"
              >
                <div className="md:my-20 w-11/12 md:w-full mx-auto mt-8">
                  <Link
                    className="text-2xl font-bold font-pilcrow text-center text-blue-600"
                    to={
                      user
                        ? user.uid !== post.author.id
                          ? `/user/${post.author.id}`
                          : "/profile"
                        : `/user/${post.author.id}`
                    }
                  >
                    {post.author.name}
                  </Link>
                  <p className="font-pilcrow">{post.dateCreated}</p>
                </div>
              </aside>
              <div className="md:w-8/12 xl:w-9/12 mx-auto">
                <div
                  className="editorcontent font-hind my-8 w-11/12 mx-auto md:mx-0
                  max-w-[66ch]"
                  dangerouslySetInnerHTML={{ __html: post.postContent }}
                ></div>
                <div className="w-11/12 mx-auto md:mx-0">
                  <ShareButtons
                    description={post.description}
                    postAuthor={post.author.name}
                    postId={post.id}
                    postTitle={post.postTitle}
                  />
                </div>
                <div className="w-11/12 mx-auto md:mx-0">
                  {location.pathname === (id && `/post/${id}`) && (
                    <PostComments />
                  )}
                  {user && location.pathname === (id && `/post/${id}`) && (
                    <PostCommentForm />
                  )}
                </div>
                {user && user.role === "admin" && (
                  <div className="my-4 md:my-8">
                    <Button
                      handleClick={() => acceptPost(authorId)}
                      variant="pendingButton"
                    >
                      Accept Post
                    </Button>
                    <Button
                      handleClick={() => rejectPost(authorId)}
                      variant="pendingButton"
                    >
                      Reject Post
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
