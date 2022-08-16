import { MainLayout } from "src/components/Layout/Layout";
import PostCommentForm from "../components/PostDetails/PostCommentForm";
import PostComments from "../components/PostDetails/PostComments";
import PostDetails from "../components/PostDetails/PostDetails";

export default function PostContent() {
  return (
    <MainLayout>
        <PostDetails />
        <hr className="border border-black"/>
        <PostComments />
        <PostCommentForm />
    </MainLayout>
  );
}
