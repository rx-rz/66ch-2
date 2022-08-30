import { useParams } from "react-router-dom";
import { Footer, MainLayout } from "src/components";
import { motion, useIsPresent } from "framer-motion";
import PostDetails from "../components/PostDetails/PostDetails";
import { useLayoutEffect } from "react";
import { PostExtras } from "../components/PostDetails/PostExtras";

export default function PostContent() {
  const isPresent = useIsPresent();
  const { status = "null" } = useParams();
  const { authorId = "null" } = useParams();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <PostDetails status={status} authorId={authorId} />
        <div className="w-full md:w-10/12 mx-auto">
          <PostExtras />
        </div>
        <Footer />
      </motion.div>
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.6, ease: "easeIn" } }}
        exit={{ scaleY: 1, transition: { duration: 0.6, ease: "easeOut" } }}
        style={{ originY: isPresent ? 0 : 1 }}
        className="inset-0 fixed z-50 bg-secondary"
      />
    </MainLayout>
  );
}
