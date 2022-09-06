import { useState } from "react";
import { usePostImage } from "src/hooks/usePostImage";
import { FileUploader } from "react-drag-drop-files";
import { Button, Form, TextAreaField, SelectField } from "src/components";
import closeButton from "src/assets/close.svg";
import toast from "react-hot-toast";
import useOptimizeImage from "src/hooks/useOptimiseImage";
import { DocumentData, DocumentReference } from "firebase/firestore";

type PostSettingProps = {
  tag: string;
  description: string;
  imageUrl: string;
};

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

type EditPostSettingsProps = {
  editPostSettings: (postSettings: PostSettingProps) => void;
  handleMenuToggle: () => void;
  draft?: Partial<Blog>;
};

const errorToast = () =>
  toast.error("Uploaded files can only be PNG, JPEG or JPG", {
    style: {
      borderRadius: 0,
      color: "#2F3630",
      backgroundColor: "#EEECE7",
      border: "1px solid #2F3630",
      width: "300px",
    },
    duration: 4000,
  });

export default function PostSettingsForm({
  editPostSettings,
  handleMenuToggle,
  draft,
}: EditPostSettingsProps) {
  type PostSettingProps = {
    tag: string;
    description: string;
  };
  const handleSave = (data: PostSettingProps) => {
    editPostSettings({
      tag: data.tag,
      description: data.description,
      imageUrl: url,
    });
  };

  const tagNames = [
    "Nature",
    "Politics",
    "Expository",
    "Technology",
    "Art",
    "Lifestyle",
    "Fashion",
    "Tourism",
    "Entertainment",
  ];
  const [file, setFile] = useState<File | null | any>(null);
  const { imageFile } = useOptimizeImage(file);
  const { url, progress, error } = usePostImage(imageFile);

  const types = ["image/jpg", "image/jpeg", "image/png"];
  const handleChange = (e: any) => {
    let selectedFile = e;
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        setFile(null);
        errorToast();
      }
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto mt-6 md:hidden cursor-pointer invert">
        <button
          className="border-4 border-white"
          data-testid="closeButton"
          onClick={handleMenuToggle}
        >
          <img src={closeButton} alt="Close" width="30px" />
        </button>
      </div>
      <Form onSubmit={handleSave} className="w-11/12 mx-auto my-24">
        {({ register, formState, setValue }) => (
          <>
            {draft && setValue("description", `${draft.description}`)}
            {draft && setValue("tag", `${draft.tag}`)}
            <FileUploader handleChange={handleChange} name="File">
              <div className="cursor-pointer h-36  w-full border-dotted border-2 border-primary grid items-center font-pilcrow">
                {!progress ? (
                  <p className="mx-auto text-primary w-9/12 text-center">
                    Click to upload image or drag and drop image files here
                    (PNG, JPG or JPEG, preferably landscape images.)
                  </p>
                ) : (
                  <p className="mx-auto text-primary w-9/12 text-center">
                    Image {progress}% uploaded
                  </p>
                )}
                {error && <p className="text-red-600">{error.message}</p>}
              </div>
            </FileUploader>
            <SelectField
              options={tagNames.map((tagName) => ({ value: tagName }))}
              className="border-2 border-tertiary w-full focus:outline-none  py-2 text-tertiary mt-3"
              defaultValue="Nature"
              registration={register("tag")}
              label="Tag"
              error={formState.errors.tag}
            />
            <TextAreaField
              placeholder="Enter the post description here (300 characters maximum)"
              registration={register("description", {
                maxLength: {
                  value: 300,
                  message:
                    "Your description should not be more than 300 characters long",
                },
                required: "Please enter a post description",
              })}
              className="resize-none bg-primary text-black w-full border-2 border-tertiary  focus:bg-white focus:outline-none mt-3 p-1"
              label="Description"
              error={formState.errors.description}
            />
            <Button
              type="submit"
              data-testid="submitButton"
              variant="settingsButton"
              className="hidden md:block"
            >
              Save Settings
            </Button>
            <Button
              handleClick={handleMenuToggle}
              type="submit"
              className="md:hidden"
              variant="settingsButton"
            >
              Save Settings
            </Button>
          </>
        )}
      </Form>
    </>
  );
}
