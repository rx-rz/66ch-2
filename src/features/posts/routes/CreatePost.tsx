import { doc } from "firebase/firestore";
import { useRef, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { MainLayout } from "src/components";
import { database } from "src/config/firebaseConfig";
import { PostContentForm } from "../components/CreatePost/PostContentForm";
import PostSettingsForm from "../components/CreatePost/PostSettingsForm";

type PostSettingProps = {
  tag: string;
  description: string;
  imageUrl: string;
};

export default function CreatePost() {
  // Create a ref for settings element
  const settings = useRef<HTMLDivElement>(null);
  //  destructuring the id from useParams hook, if not present set default value
  const { id = "@!@#$%^&*()(*&^%#@#$%%" } = useParams();
  // reference to the drafts document with the given id
  const draftRef = doc(database, "drafts", id);
  // fetch the draft data
  const [draft] = useDocument(draftRef);
  // create a state variable to hold post settings
  const [postSettings, setPostSettings] = useState<PostSettingProps>();

  // toggle the visibility of settings menu
  const handleMenuToggle = () => {
    settings.current!.classList.toggle("hidden");
  };

  // update postSettings state variable
  const editPostSettings = (postSettings: PostSettingProps) => {
    setPostSettings(postSettings);
  };

  return (
    <MainLayout>
      <>
        <Toaster />
        <main className=" flex justify-between h-screen w-full">
          <div
            className="fixed  md:sticky md:flex z-40 md:top-0
             hidden md:w-3/12 w-full  bg-[#222] rounded-tr-xl rounded-br-xl"
            ref={settings}
          >
            <div className="z-40 min-h-screen mx-auto">
              <PostSettingsForm
                editPostSettings={editPostSettings}
                draft={draft?.data()}
                handleMenuToggle={handleMenuToggle}
              />
            </div>
          </div>
          <div className=" h-screen overflow-y-scroll w-full ">
            <div className="w-11/12 mx-auto my-4">
              <PostContentForm
                handleMenuToggle={handleMenuToggle}
                description={postSettings?.description}
                draft={draft?.data()}
                tag={postSettings?.tag}
                imageUrl={postSettings?.imageUrl}
              />
            </div>
          </div>
        </main>
      </>
    </MainLayout>
  );
}
