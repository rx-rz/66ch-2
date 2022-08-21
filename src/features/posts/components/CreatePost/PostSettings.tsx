import { useState } from "react";
import { Form } from "src/components/Elements/Form/Form";
import { usePostImage } from "src/hooks/usePostImage";
import { FileUploader } from "react-drag-drop-files";
import { Button } from "src/components/Elements/Button/Button";
import { TextAreaField } from "src/components/Elements/Form/TextAreaField";
import { SelectField } from "src/components/Elements/Form/SelectField";
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
  status: string,
  isChecked: boolean

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

export default function PostSettings({
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
  ];
  const [file, setFile] = useState<File | null | any>(null);
  const {imageFile} = useOptimizeImage(file)
  const { url } = usePostImage(imageFile);

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
        <img
          src={closeButton}
          alt="Close"
          width="30px"
          onClick={handleMenuToggle}
        />
      </div>
      <Form onSubmit={handleSave} className="w-11/12 mx-auto my-24">
        {({ register, formState, setValue }) => (
          <>
            {draft && setValue("description", `${draft.description}`)}
            {draft && setValue("tag", `${draft.tag}`)}
            <FileUploader handleChange={handleChange} name="File">
              <div className="cursor-pointer h-36  w-full border-dotted border-2 border-primary grid items-center">
                <p className="mx-auto text-primary w-9/12 text-center">
                  Click to upload image or drag and drop image files here (PNG,
                  JPG or JPEG, preferably landscape images.)
                </p>
              </div>
            </FileUploader>
            <SelectField
              options={tagNames.map((tagName) => ({ value: tagName }))}
              className="border border-primary w-full focus:outline-none bg-tertiary py-2 text-primary mt-3"
              defaultValue="Nature"
              registration={register("tag")}
              label="Tag"
              error={formState.errors.tag}
            />
            <TextAreaField
              placeholder="enter the post description here (300 characters maximum)"
              registration={register("description", {
                maxLength: {
                  value: 300,
                  message:
                    "Your description should not be more than 300 characters long",
                },
                required: "Please enter a post description",
              })}
              className="resize-none bg-primary text-black w-full border-dotted border border-primary focus:bg-white focus:outline-none mt-3"
              label="Description"
              error={formState.errors.description}
            />
            <Button
              type="submit"
              className="text-xl font-Synonym self-end w-full  hidden md:block md:mt-12 bottom-0 mx-auto bg-tertiary border border-primary text-primary p-1 py-2 transition-colors duration-300  hover:bg-secondary hover:text-tertiary"
            >
              Save Settings
            </Button>
            <Button
              handleClick={handleMenuToggle}
              type="submit"
              className="text-xl font-Synonym self-end w-full md:hidden mt-8  md:mt-12 bottom-0 mx-auto bg-tertiary border border-primary text-primary p-1 py-2 transition-colors duration-300  hover:bg-secondary hover:text-tertiary"
            >
              Save Settings
            </Button>
          </>
        )}
      </Form>
    </>
  );
}
