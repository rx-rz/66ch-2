import { TextAreaField, Form, Button } from "src/components";
import { useCreateComment } from "../../api/useCreateComment";

type CommentProps = {
  comment: string;
};

export default function PostCommentForm() {
  const { handleCommentSubmit } = useCreateComment();

  return (
    <Form
      onSubmit={(data: CommentProps) => handleCommentSubmit(data)}
      className="max-w-4xl w-11/12 md:w-9/12 mb-12 md:mx-0  "
    >
      {({ register, formState }) => (
        <>
          <TextAreaField
            registration={register("comment", {
              required: "Please enter a comment",
            })}
            placeholder="Enter a comment here"
            error={formState.errors.comment}
            className="border-2 border-black text-black
             dark:border-white w-full  resize-none p-2 t"
          />
          <Button
            type="submit"
            className="border-2 px-3 border-black dark:border-white
             font-pilcrow bg-secondary text-white"
          >
            Comment
          </Button>
        </>
      )}
    </Form>
  );
}
