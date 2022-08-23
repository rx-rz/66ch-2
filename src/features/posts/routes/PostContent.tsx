import { useParams } from "react-router-dom";
import { MainLayout } from "src/components";
import {motion, useIsPresent} from 'framer-motion'
import PostCommentForm from "../components/PostDetails/PostCommentForm";
import PostComments from "../components/PostDetails/PostComments";
import PostDetails from "../components/PostDetails/PostDetails";

export default function PostContent() {
  const isPresent = useIsPresent();
  const { status = "null" } = useParams();
  const { authorId = "null" } = useParams();

  return (
    <MainLayout>
      <PostDetails status={status} authorId={authorId} />
      <PostComments />
      <PostCommentForm />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: .6, ease: "easeIn" } }}
        exit={{ scaleY: 1, transition: { duration: .6, ease: "easeOut" } }}
        style={{ originY: isPresent ? 0 : 1 }}
        className="inset-0 fixed z-50 bg-yellow-300"
      />
    </MainLayout>
  );
}
