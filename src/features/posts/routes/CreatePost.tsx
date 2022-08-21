import { doc } from "firebase/firestore";
import { useRef, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { MainLayout } from "src/components/Layout/Layout";
import { database } from "src/config/firebaseConfig";
import { PostContent } from "../components/CreatePost/PostContent";
import PostSettings from "../components/CreatePost/PostSettings";

type PostSettingProps = {
  tag: string;
  description: string;
  imageUrl: string;
};

export default function CreatePost() {
  const settings = useRef<HTMLDivElement>(null);
  const { id = "@!@#$%^&*()(*&^%#@#$%%" } = useParams();
  const draftRef = doc(database, "drafts", id);
  const [draft] = useDocument(draftRef);
  const [postSettings, setPostSettings] = useState<PostSettingProps>();

  const handleMenuToggle = () => {
    settings.current!.classList.toggle("hidden");
  };

  const editPostSettings = (postSettings: PostSettingProps) => {
    setPostSettings(postSettings);
  };

  return (
    <MainLayout>
      <>
        <Toaster />
        <main className=" flex justify-between h-screen w-full">
          <div
            className="fixed  md:sticky md:flex z-40 md:top-0  hidden md:w-4/12 w-full bg-tertiary"
            ref={settings}
          >
            <div className="z-40 h-screen mx-auto">
              <PostSettings
                editPostSettings={editPostSettings}
                draft={draft?.data()}
                handleMenuToggle={handleMenuToggle}
              />
            </div>
          </div>
          <div className=" h-screen overflow-y-scroll w-full ">
            <div className="w-11/12 mx-auto my-4">
              <PostContent
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
