import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "src/components/Elements/Form/Form";
import { InputField } from "src/components/Elements/Form/InputField";
import { usePostImage } from "src/hooks/usePostImage";

type PostSettingProps = {
  tag: string;
  description: string;
  imageUrl: string;
};

type EditPostSettingsProps = {
  editPostSettings: (postSettings: PostSettingProps) => void;
};

export default function PostSettings({
  editPostSettings,
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
  
  const [file, setFile] = useState<File>({} as File);
  const [error, setError] = useState<string | null>(null);
  const { progress, url } = usePostImage(file);

  const handleChange = (e: any) => {
    const types = ["image/png", "image/jpeg", "image/jpg"];
    let selectedFile = e.target.files[0];
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

  useEffect(() => {
    console.log(url);
  }, [url]);
  return (
    <>
      <Form onSubmit={handleSave}>
        {({ register, formState }) => (
          <>
            <input type="file" onChange={handleChange} />
            <InputField
              registration={register("tag")}
              label="tag"
              type="text"
              error={formState.errors.tag}
            />
            <InputField
              registration={register("description")}
              label="description"
              type="text"
              error={formState.errors.description}
            />
            <button type="submit" onSubmit={() => editPostSettings}>
              Save Settings
            </button>
          </>
        )}
      </Form>
    </>
  );
}
