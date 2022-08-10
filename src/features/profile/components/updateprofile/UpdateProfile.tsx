import { updateProfile } from "firebase/auth";
import { collection, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Elements/Button/Button";
import { Form } from "src/components/Elements/Form/Form";
import { InputField } from "src/components/Elements/Form/InputField";
import { postConverter } from "src/features/posts/api/postConverter";
import { usePostImage } from "src/hooks/usePostImage";
import { auth, database } from "src/utils/firebaseConfig";

export default function UpdateProfile() {
  type UpdateFormValues = {
    firstName: string;
    lastName: string;
    profileUrl: string;
  };
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const ref = collection(database, "posts").withConverter(postConverter);
  const [data] = useCollectionData(ref);
  const userPosts = data?.filter((doc) => doc.author.id === user?.uid);
  const namesOfUser = user && user.displayName!.split(" ");

  const [file, setFile] = useState<File>({} as File);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const [error, setError] = useState<string | null>(null);
  const { progress, url } = usePostImage(file);
  const handleChange = (e: any) => {
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

  const submitData = async (data: UpdateFormValues) => {
    await updateProfile(user!, {
      displayName: data.firstName + " " + data.lastName,
      photoURL: url,
    });

    userPosts!.forEach(async (document) => {
      const postsRef = doc(database, "posts", document.id);
      await updateDoc(postsRef, {
        author: { name: user!.displayName, id: user!.uid },
      });
    });
    const usersRef = doc(database, "users", user!.uid);
    await updateDoc(usersRef, {
      displayName: data.firstName + " " + data.lastName,
      photoUrl: url,
    });
    navigate("/profile");
  };

  return (
    <Form onSubmit={submitData} className="mx-auto w-10/12 md:w-4/12 my-24">
      {({ register, formState }) => (
        <>
          <p className="font-medium mb-4">Profile Picture</p>
          <FileUploader handleChange={handleChange} name="File" >
            <div className="cursor-pointer h-36  w-full border-dotted border-2 border-black grid items-center">
              <p className="mx-auto text-black w-9/12 text-center">
                Click to upload image or drag and drop image files here
              </p>
            </div>
          </FileUploader>
          <InputField
            className="border-b border-b-black w-full my-4 focus:outline-none focus:border-b-2"
            registration={register("firstName", {required: "Please enter a first name"})}
            label="First Name"
            type="text"
            defaultValue={namesOfUser![0]}
            error={formState.errors.firstName}
          />
          <InputField
            className="border-b border-b-black w-full my-4 focus:outline-none focus:border-b-2"
            registration={register("lastName", {required: "Please enter a last name"})}
            label="Last Name"
            type="text"
            defaultValue={namesOfUser![1]}
            error={formState.errors.lastName}
          />
          <Button
            type="submit"
            className="text-xl font-Synonym  w-full bg-primary text-white p-1 py-2 transition-opacity duration-300  hover:opacity-80 mt-8"
          >
            Update Profile
          </Button>
        </>
      )}
    </Form>
  );
}
