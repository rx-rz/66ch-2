import React from "react";
import MainLayout from "src/components/Layout/Layout";
import PostContent from "../components/CreatePost/PostContent";
import PostSettings from "../components/CreatePost/PostSettings";

export default function CreatePost() {
  return (
    <MainLayout>
      <nav className="flex">
        <div className="justify-end">
          <button>Save As Draft</button>
          <button>Create Post</button>
        </div>
      </nav>
      <main>
        <div><PostContent/></div>
        <div><PostSettings/></div>
      </main>
    </MainLayout>
  );
}
