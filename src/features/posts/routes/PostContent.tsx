import { MainLayout } from "src/components/Layout/Layout";
import PostCommentForm from "../components/PostDetails/PostCommentForm";
import PostComments from "../components/PostDetails/PostComments";
import PostDetails from "../components/PostDetails/PostDetails";

export default function PostContent() {
  return (
    <MainLayout>
      <div className="w-11/12 mx-auto max-w-6xl mb-8">
        <PostDetails />
        <PostComments />
        <PostCommentForm />
      </div>
    </MainLayout>
  );
}
