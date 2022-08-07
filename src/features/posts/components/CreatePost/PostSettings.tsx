import { useEffect, useState } from "react";
import { Form } from "src/components/Elements/Form/Form";
import { InputField } from "src/components/Elements/Form/InputField";
import { usePostImage } from "src/hooks/usePostImage";
export default function PostSettings() {
 
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
    console.log(url)
  }, [url])
  return (
    <>
      <Form onSubmit={() => console.log()}>
        {({ register, formState }) => (
          <>
            <input type="file" onChange={handleChange} />
            <InputField
              registration={register("tag")}
              label="tag"
              type="text"
              //   error={formState.errors.}
            />
            <InputField
              registration={register("description")}
              label="description"
              type="text"
            />
          </>
        )}
      </Form>
    </>
  );
}
