import { FileUploader } from "react-drag-drop-files";
import { Form, Button, InputField } from "src/components";
import { useUpdateProfile } from "../../api/useUpdateProfile";

type UpdateFormValues = {
  firstName: string;
  lastName: string;
  profileUrl: string;
};

export default function UpdateProfile() {
  
  const { handleChange, handleProfileUpdate, namesOfUser, pending } = useUpdateProfile();

  return (
    <Form
      onSubmit={(data: UpdateFormValues) => handleProfileUpdate(data)}
      className="mx-auto w-10/12 md:w-4/12 my-24"
    >
      {({ register, formState }) => (
        <>
          <p className="font-medium mb-4">Profile Picture</p>
          <FileUploader handleChange={(e: any) => handleChange(e)} name="File">
            <div className="cursor-pointer h-36  w-full border-dotted border-2 border-black grid items-center">
              <p className="mx-auto text-black w-9/12 text-center">
                Click to upload image or drag and drop image files here
              </p>
            </div>
          </FileUploader>
          <InputField
            className=" border-tertiary w-full border p-1  bg-primary focus:outline-none focus:bg-white mt-2"
            registration={register("firstName", {
              required: "Please enter a first name",
            })}
            label="First Name"
            type="text"
            // defaultValue={namesOfUser![0]}
            error={formState.errors.firstName}
          />
          <InputField
            className=" border-tertiary w-full border p-1  bg-primary focus:outline-none focus:bg-white mt-2"
            registration={register("lastName", {
              required: "Please enter a last name",
            })}
            label="Last Name"
            type="text"
            // defaultValue={namesOfUser![1]}
            error={formState.errors.lastName}
          />
          <Button
            type="submit"
            className="text-xl font-Synonym  w-full bg-tertiary text-white p-1 py-2 transition-opacity duration-300  hover:opacity-80 mt-8"
          >
            {!pending ? <>Update Profile</> : <>Loading...</>}
          </Button>
        </>
      )}
    </Form>
  );
}
