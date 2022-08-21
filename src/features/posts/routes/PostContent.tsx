import { useParams } from "react-router-dom";
import { MainLayout } from "src/components";
import PostCommentForm from "../components/PostDetails/PostCommentForm";
import PostComments from "../components/PostDetails/PostComments";
import PostDetails from "../components/PostDetails/PostDetails";

export default function PostContent() {
  const {status = "null"} = useParams()
  const {authorId = "null"} = useParams()

  return (
    <MainLayout>
        <PostDetails status={status} authorId={authorId}/>
        <PostComments />
        <PostCommentForm />
    </MainLayout>
  );
}

