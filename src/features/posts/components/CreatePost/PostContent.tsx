import { DocumentData, DocumentReference } from "firebase/firestore";
import { useCreatePost } from "../../api/useCreatePost";
import { Link } from "react-router-dom";
import { Button, Editor, Form, TextAreaField } from "src/components";

export type Blog = {
  author: { name: string; id: string };
  tag: string;
  id: string;
  postContent: string;
  imageDownloadUrl: string;
  postTitle: string;
  ref: DocumentReference<DocumentData>;
  dateCreated: string;
  description: string;
  status: string;
  isChecked: boolean;
};

type PostSettingProps = {
  tag: string | undefined;
  description: string | undefined;
  imageUrl: string | undefined;
  handleMenuToggle: () => void;
  draft?: Partial<Blog>;
};

type EditorProps = {
  postTitle: string;
};

export const PostContent = ({
  tag,
  description,
  imageUrl,
  handleMenuToggle,
  draft,
}: PostSettingProps) => {
  const { changeEditorContent, handleDraft, handleSubmit } = useCreatePost();

  return (
    <div className="md:w-11/12 w-full  mx-auto my-8 font-hind">
      <nav className="flex justify-between mx-auto">
        <Link to="/" className="md:text-xl text-md font-bold font-pilcrow dark:text-white">
          &#8592; Home
        </Link>
        <div className="justify-between flex">
          <Button
            className="border-2 border-tertiary dark:text-white bg-primary px-1 text-secondary md:text-xl text-md font-pilcrow dark:bg-tertiary dark:border-secondary"
            handleClick={() => handleDraft(imageUrl, tag, description, draft)}
          >
            Save As Draft
          </Button>
          <Button
            className="border-2 bg-secondary font-pilcrow border-tertiary text-primary px-1 md:text-xl text-md md:hidden ml-3"
            handleClick={handleMenuToggle}
          >
            Settings
          </Button>
        </div>
      </nav>
      <Form
        onSubmit={(data: EditorProps) =>
          handleSubmit(data, imageUrl, tag, description, draft)
        }
        options={{ mode: "onBlur" }}
      >
        {({ register, formState, setValue }) => (
          <>
            {draft && setValue("postTitle", draft.postTitle ?? "")}
            <TextAreaField
              error={formState.errors.postTitle}
              placeholder="Enter your post title here...(200 characters max)"
              registration={register("postTitle", {
                required: "Please enter a post title",
                maxLength: {
                  value: 200,
                  message:
                    "Your post title cannot be more than 200 characters long",
                },
              })}
              className="resize-none focus:outline-none w-full m-auto text-3xl md:text-4xl lg:text-5xl ml-1 bg-primary text-tertiary dark:bg-tertiary dark:text-white"
            />
            {!imageUrl && !description && !tag && (
              <p className="md:text-xl md:mt-4 mt-4 dark:text-white">
                Please specify the needed settings for the blog post in the post
                settings.
              </p>
            )}

            {imageUrl ? (
              <img
                src={imageUrl}
                alt={description}
                className="w-full object-cover"
              />
            ) : (
              <img
                src={draft?.imageDownloadUrl}
                alt={description}
                className="w-full object-cover"
              />
            )}
            <Editor
              handleContentChange={changeEditorContent}
              draftContent={draft?.postContent}
            />
            <Button
              type="submit"
              className="text-xl font-pilcrow lg:w-5/12 w-full border-2 border-tertiary bg-secondary text-primary p-1 py-2 text-center lg:mt-0 mt-4 transition-opacity duration-300  hover:opacity-80"
            >
              Create Post
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};
