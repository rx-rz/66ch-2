import { useUserContext } from "src/context";
import { useAdminPostApprovalOptions } from "../../api";
import { motion } from "framer-motion";
import PostComments from "./PostComments";
import PostCommentForm from "./PostCommentForm";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button } from "src/components";
import { ShareButtons } from "./ShareButtons";
import { useEffect } from "react";
import { ColorRing } from "react-loader-spinner";

type PostContentProps = {
  authorId: string;
};

export default function PostDetails({ authorId }: PostContentProps) {
  // Importing destructured variables from the context hooks
  const { user } = useUserContext()!;

  // Importing destructured variables from the useParams() hook
  const { id } = useParams();

  // Importing destructured variables from the useAdminPostApprovalOptions() custom hook
  const { post, loading, error, acceptPost, rejectPost } =
    useAdminPostApprovalOptions();

  // Importing the useLocation() hook
  const location = useLocation();

  // using useEffect to update the document title when post details change
  useEffect(() => {
    document.title = `${post?.postTitle} by ${post?.author.name}`;
  }, [post?.postTitle, post?.author]);

  return (
    <div className="mx-auto   ">
      {error && <strong>{error.message}</strong>}
      {loading && (
        <div className="h-screen flex items-center justify-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#000", "#000", "#000", "#000", "#000"]}
          />
        </div>
      )}

      {post && (
        <main>
          <div className="md:w-10/12 w-full mx-auto ">
            <h1
              className=" w-full md:w-10/12 mx-auto my-12 text-3xl
             md:text-7xl text-center font-supreme font-bold"
            >
              {post.postTitle}
            </h1>
            <motion.img
              src={post.imageDownloadUrl}
              alt={post.postTitle}
              className="mx-auto  rounded-xl
               object-cover aspect-video max-h-[40vh]  md:max-h-[80vh]"
              initial={{ width: "50%" }}
              animate={{ width: "95%" }}
              transition={{ duration: 0.7 }}
            />
            <div className="flex flex-wrap relative mx-auto md:w-9/12 w-full">
              <aside
                className="md:w-3/12 xl:w-2/12 w-full md:sticky top-16
              h-fit md:h-screen
            "
              >
                <div className="md:my-20  md:w-11/12 mx-auto mt-8 hidden md:block">
                  <Link
                    className="text-2xl font-bold font-chubbo text-center text-blue-600"
                    /*If the author of the post's ID matches that of the logged in
          user, the following link carries the current user to his/her profile.
          If the IDs do not match, it carries the user to the profile of the author
          of the post. */
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
                  <p className="font-chubbo">{post.dateCreated}</p>
                </div>
              </aside>
              <div className="md:w-8/12 xl:w-9/12 mx-auto">
                <div className="w-11/12 mx-auto mt-8  md:hidden">
                  <Link
                    className="text-2xl font-bold font- text-center text-blue-600"
                    to={
                      /*If the author of the post's ID matches that of the logged in
          user, the following link carries the current user to his/her profile.
          If the IDs do not match, it carries the user to the profile of the author
          of the post. */
                      user
                        ? user.uid !== post.author.id
                          ? `/user/${post.author.id}`
                          : "/profile"
                        : `/user/${post.author.id}`
                    }
                  >
                    {post.author.name}
                  </Link>
                  <p className="font-supreme">{post.dateCreated}</p>
                </div>
                <div
                  className="editorcontent font-chubbo my-8 w-11/12 mx-auto md:mx-0 font-medium leading-snug  opacity-90
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
                  {/*If the current location is not the post approval page, display comments on the page */}
                  {location.pathname === (id && `/post/${id}`) && (
                    <PostComments />
                  )}
                  {/*If the current location is not the post approval page, display the comment form on the page */}
                  {user && location.pathname === (id && `/post/${id}`) && (
                    <PostCommentForm />
                  )}
                </div>
                {/*If the current user is an admin and the post status is pending, show the admin approval buttons. */}
                {user && user.role === "admin" && post.status === "pending" && (
                  <div className="my-4 md:my-8">
                    <Button
                      handleClick={() => acceptPost(authorId)}
                      variant="pendingButton"
                    >
                      Accept Post
                    </Button>
                    <Button
                      handleClick={() => rejectPost(authorId)}
                      variant="pendingButtonTwo"
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
