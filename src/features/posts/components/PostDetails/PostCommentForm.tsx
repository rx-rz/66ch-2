import { TextAreaField, Form } from "src/components";
import { useCreateComment } from "../../api/useCreateComment";

type CommentProps = {
  comment: string;
};

export default function PostCommentForm() {
const {handleCommentSubmit} = useCreateComment()

  return (
    <Form onSubmit={(data: CommentProps) => handleCommentSubmit(data)} className="max-w-4xl  w-11/12 mb-12 mx-auto">
      {({ register, formState }) => (
        <>
          <TextAreaField
            registration={register("comment", {
              required: "Please enter a comment",
            })}
            placeholder="Enter a comment here"
            error={formState.errors.comment}
            className="border-2 border-black w-full  resize-none p-2"
          />
          <button type="submit" className="border-2 px-3 border-black font-pilcrow bg-yellow-300">
            Comment
          </button>
        </>
      )}
    </Form>
  );
}
