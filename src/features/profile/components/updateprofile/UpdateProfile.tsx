import { FileUploader } from "react-drag-drop-files";
import { Form, Button, InputField } from "src/components";
import { useUpdateProfile } from "../../api/useUpdateProfile";

type UpdateFormValues = {
  firstName: string;
  lastName: string;
  profileUrl: string;
};

export default function UpdateProfile() {
  
  const { handleChange, handleProfileUpdate, namesOfUser, pending , progress} = useUpdateProfile();

  return (
    <Form
      onSubmit={(data: UpdateFormValues) => handleProfileUpdate(data)}
      className="mx-auto w-10/12 md:w-4/12 lg:w-3/12 my-24  p-1"
    >
      {({ register, formState }) => (
        <>
          <p className="text-medium md:text-lg dark:text-white font-pilcrow mb-4">Profile Picture</p>
          <FileUploader handleChange={(e: any) => handleChange(e)} name="File">
            <div className="cursor-pointer h-36  w-full border-dotted border-2 border-black dark:border-white dark:text-white grid items-center">
              <p className="mx-auto  w-9/12 text-center font-pilcrow">
              {!progress ? <>Click to upload an image</> : <>Image {progress}% uploaded</>}
              </p>
            </div>
          </FileUploader>
          <InputField
            className=" border-tertiary w-full border p-1  bg-primary  focus:bg-white mt-2 text-black font-hind"
            registration={register("firstName", {
              required: "Please enter a first name",
            })}
            label="First Name"
            type="text"
            // defaultValue={namesOfUser![0]}
            error={formState.errors.firstName}
          />
          <InputField
            className=" border-tertiary w-full border p-1  bg-primary  focus:bg-white mt-2 text-black font-hind"
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
            className="font-pilcrow border-2 dark:border-white bg-secondary w-full my-8 py-2 text-white border-black"
          >
            {!pending ? <>Update Profile</> : <>Loading...</>}
          </Button>
        </>
      )}
    </Form>
  );
}
