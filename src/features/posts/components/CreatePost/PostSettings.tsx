import { useState } from "react";
import { Form } from "src/components/Elements/Form/Form";
import { usePostImage } from "src/hooks/usePostImage";
import { FileUploader } from "react-drag-drop-files";
import { Button } from "src/components/Elements/Button/Button";
import { TextAreaField } from "src/components/Elements/Form/TextAreaField";
import { SelectField } from "src/components/Elements/Form/SelectField";
type PostSettingProps = {
  tag: string;
  description: string;
  imageUrl: string;
};

type EditPostSettingsProps = {
  editPostSettings: (postSettings: PostSettingProps) => void;
  handleMenuToggle: () => void
};

export default function PostSettings({
  editPostSettings, handleMenuToggle
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
  ];
  const [file, setFile] = useState<File>({} as File);
  const [error, setError] = useState<string | null>(null);
  const { progress, url } = usePostImage(file);

  const types = ["image/png", "image/jpeg", "image/jpg"];

  const handleChange = (e: any) => {
    console.log(e);
    let selectedFile = e;
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setError(null);
        setFile(selectedFile);
      } else {
        setFile(selectedFile);
        setError("Please select an image file (png or jpg)!");
      }
    }
  };

  // useEffect(() => {
  //   console.log(url);
  // }, [url]);
  return (
    <>
      <Form onSubmit={handleSave} className="w-11/12 mx-auto my-24">
        {({ register, formState }) => (
          <>
            <FileUploader handleChange={handleChange} name="File">
              <div className="cursor-pointer h-36  w-full border-dotted border-2 border-white grid items-center">
                <p className="mx-auto text-white w-9/12 text-center">
                  Click to upload image or drag and drop image files here
                </p>
              </div>
            </FileUploader>
            {/* <input type="file" onChange={handleSave}  /> */}
            <SelectField
              options={tagNames.map((tagName) => ({ value: tagName }))}
              className="border border-black w-full focus:outline-none bg-tertiary py-2 text-black mt-3"
              defaultValue="Nature"
              registration={register("tag")}
              label="tag"
              error={formState.errors.tag}
            />
            <TextAreaField
              registration={register("description", {
                maxLength: {
                  value: 500,
                  message:
                    "Your description should not be more than 500 characters long",
                },
                required: "Please enter a post description",
              })}
              className="resize-none bg-tertiary text-black w-full border-dotted border border-black focus:border-2 focus:outline-none mt-3"
              label="description"
              error={formState.errors.description}
            />
            <Button
              type="submit"
              className="text-xl font-Synonym self-end w-full  hidden md:block md:mt-12 bottom-0 mx-auto bg-white text-black p-1 py-2 transition-opacity duration-300  hover:opacity-80"
            >
              Save Settings
            </Button>
            <Button
            handleClick={handleMenuToggle}
              type="submit"
              className="text-xl font-Synonym self-end w-full md:hidden  md:mt-12 bottom-0 mx-auto bg-white text-black p-1 py-2 transition-opacity duration-300  hover:opacity-80"
            >
              Save Settings
            </Button>
          </>
        )}
      </Form>
    </>
  );
}