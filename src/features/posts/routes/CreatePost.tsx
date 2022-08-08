import React, { useRef, useState } from "react";
import MainLayout from "src/components/Layout/Layout";
import PostContent from "../components/CreatePost/PostContent";
import PostSettings from "../components/CreatePost/PostSettings";

export default function CreatePost() {
  const settings = useRef<HTMLDivElement>(null);

  type PostSettingProps = {
    tag: string;
    description: string;
    imageUrl: string;
  };
  const [postSettings, setPostSettings] = useState<PostSettingProps>();

  const passBlogSettingsData = (postSettings: PostSettingProps) => {
    setPostSettings(postSettings);
  };

  const handleMenuToggle = () => {
    settings.current!.classList.toggle("hidden");
  };

  const editPostSettings = (postSettings: PostSettingProps) => {
    setPostSettings(postSettings);
  };

  return (
    <MainLayout>
      {/* <nav className="flex">
        <div className="justify-end">
          <button>Save As Draft</button>
          <button onClick={handleMenuToggle}>Settings</button>
        </div>
      </nav> */}
      <main className="relative flex justify-between">
        <div
          ref={settings}
          className="sticky h-screen border-2  w-11/12 md:w-3/12 bg-tertiary"
        >
          <PostSettings editPostSettings={editPostSettings} />
        </div>
        <div className="w-9/12 ">
          
          <PostContent
            description={postSettings?.description}
            tag={postSettings?.tag}
            imageUrl={postSettings?.imageUrl}
          />
        </div>
      </main>
    </MainLayout>
  );
}
