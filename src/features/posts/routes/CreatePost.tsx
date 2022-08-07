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
      <nav className="flex">
        <div className="justify-end">
          <button>Save As Draft</button>
          <button onClick={handleMenuToggle}>Settings</button>
        </div>
      </nav>
      <main className="relative">
        <div className="w-full">
          <PostContent
            description={postSettings?.description}
            tag={postSettings?.tag}
            imageUrl={postSettings?.imageUrl}
          />
        </div>
        <div
          ref={settings}
          className="lg:top-32 top-24 border-2 right-0 bottom-0 fixed z-20 bg-white"
        >
          <PostSettings editPostSettings={editPostSettings} />
        </div>
      </main>
    </MainLayout>
  );
}
