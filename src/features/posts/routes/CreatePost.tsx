import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/components/Elements/Button/Button";
import MainLayout from "src/components/Layout/Layout";
import { PostContent } from "../components/CreatePost/PostContent";
import PostSettings from "../components/CreatePost/PostSettings";
import closeButton from "src/assets/close.svg";

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
          className="fixed  md:sticky md:block z-40 md:top-0  hidden w-96 "
          ref={settings}
        >
          <div className="z-40 h-screen border-2  bg-tertiary ">
            <div className="w-11/12 mx-auto mt-6 md:hidden cursor-pointer">
              <img
                src={closeButton}
                alt="Close"
                width="30px"
                
                onClick={handleMenuToggle}
              />
            </div>
            <PostSettings editPostSettings={editPostSettings} />
          </div>
        </div>
        <div className=" h-screen overflow-y-scroll w-full ">
          <div className="w-11/12 mx-auto my-4">
            <nav className="flex justify-between  bg-white ">
              <Link to="/" className="text-xl font-bold">
                &#8592; Home
              </Link>
              <div className="justify-between flex max-w-6xl ">
                <Button className="border border-black px-1 md:text-xl ">
                  Save As Draft
                </Button>
                <Button
                  handleClick={handleMenuToggle}
                  className="border border-black px-1 bg-black text-white md:text-xl md:hidden ml-3"
                >
                  Settings
                </Button>
              </div>
            </nav>
            <PostContent
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
