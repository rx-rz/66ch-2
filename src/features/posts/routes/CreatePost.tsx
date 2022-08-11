import { useRef, useState } from "react";
import { MainLayout } from "src/components/Layout/Layout";
import { PostContent } from "../components/CreatePost/PostContent";
import PostSettings from "../components/CreatePost/PostSettings";
export default function CreatePost() {
  const settings = useRef<HTMLDivElement>(null);

  type PostSettingProps = {
    tag: string;
    description: string;
    imageUrl: string;
  };

  const [postSettings, setPostSettings] = useState<PostSettingProps>();

  const handleMenuToggle = () => {
    settings.current!.classList.toggle("hidden");
  };

  const editPostSettings = (postSettings: PostSettingProps) => {
    setPostSettings(postSettings);
  };

  return (
    <MainLayout>
      <main className=" flex justify-between h-screen w-full">
        <div
          className="fixed  md:sticky md:flex z-40 md:top-0  hidden md:w-4/12 w-full bg-tertiary"
          ref={settings}
        >
          <div className="z-40 h-screen mx-auto">
            <PostSettings
              editPostSettings={editPostSettings}
              handleMenuToggle={handleMenuToggle}
            />
          </div>
        </div>
        <div className=" h-screen overflow-y-scroll w-full ">
          <div className="w-11/12 mx-auto my-4">
            <PostContent
              handleMenuToggle={handleMenuToggle}
              description={postSettings?.description}
              tag={postSettings?.tag}
              imageUrl={postSettings?.imageUrl}
            />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
