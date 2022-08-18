import { updateProfile } from "firebase/auth";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Elements/Button/Button";
import { Form } from "src/components/Elements/Form/Form";
import { InputField } from "src/components/Elements/Form/InputField";
import { blogConverter } from "src/features/posts/api/blogConverter";
import { usePostImage } from "src/hooks/usePostImage";
import { auth, database } from "src/utils/firebaseConfig";

export default function UpdateProfile() {
  type UpdateFormValues = {
    firstName: string;
    lastName: string;
    profileUrl: string;
  };
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [pending, setPending] = useState(false);
  const ref = collection(database, "posts").withConverter(blogConverter);
  const [data] = useCollectionData(ref);
  const userPosts = data?.filter((doc) => doc.author.id === user?.uid);
  const namesOfUser = user && user.displayName!.split(" ");

  const [file, setFile] = useState<File>({} as File);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const { progress, url } = usePostImage(file);
  const handleChange = (e: any) => {
    let selectedFile = e;
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        setFile(selectedFile);
      }
    }
  };

  const submitData = async (data: UpdateFormValues) => {
    setPending(true);
    await updateProfile(user!, {
      displayName:
        (data.firstName ?? namesOfUser![0]) +
        " " +
        (data.lastName ?? namesOfUser![1]),
      photoURL: url ?? user!.photoURL,
    });
    userPosts!.forEach(async (document) => {
      const postsRef = doc(database, "posts", document.id);
      await updateDoc(postsRef, {
        author: { name: user!.displayName, id: user!.uid },
      });
    });
    setPending(false);
    navigate("/profile");
  };

  return (
    <Form onSubmit={submitData} className="mx-auto w-10/12 md:w-4/12 my-24">
      {({ register, formState }) => (
        <>
          <p className="font-medium mb-4">Profile Picture</p>
          <FileUploader handleChange={handleChange} name="File">
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
            defaultValue={namesOfUser![0]}
            error={formState.errors.firstName}
          />
          <InputField
            className=" border-tertiary w-full border p-1  bg-primary focus:outline-none focus:bg-white mt-2"
            registration={register("lastName", {
              required: "Please enter a last name",
            })}
            label="Last Name"
            type="text"
            defaultValue={namesOfUser![1]}
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
