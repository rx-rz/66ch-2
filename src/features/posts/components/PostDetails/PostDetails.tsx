import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { database } from "src/utils/firebaseConfig";

export default function PostDetails() {
  const { id } = useParams();
  const postRef = doc(database, "posts", id!);
  const [value, loading, error] = useDocument(postRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return (
    <div className="mx-auto md:my-36 my-12">
      {error && <strong>{error.message}</strong>}
      {loading && <span>Loading...</span>}

      {value && (
        <div className="w-11/12 mx-auto">
          <div className="w-full md:mb-24  mb-16">
            <div className="flex mb-8 md:w-6/12">
              <p className=" text-xl md:text-2xl mr-6">
                {value.data()!.author.name}{" "}
              </p>
              <p className=" text-xl md:text-2xl">
                {value.data()!.dateCreated}
              </p>
            </div>
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl md:mb-24 mb-16 text-tertiary ">
              {value.data()!.postTitle}
            </h1>
            <img
              src={value.data()!.imageDownloadUrl}
              alt=""
              className="border border-black object-cover w-full max-h-details"
              loading="eager"
            />
          </div>
          <div
            className="text-xl md:text-2xl max-w-3xl w-11/12  [&>ol]:list-decimal [&>ol]:ml-10 [&>ul]:list-disc  [&>ul]:ml-10 [&>h1]:md:text-5xl [&>h1]:font-bold [&>h1]:text-4xl [&>h2]:md:text-4xl [&>h2]:text-3xl [&>h2]:font-bold  [&>h3]:md:text-3xl [&>h3]:text-2xl [&>h3]:font-bold [&>p>a]:text-blue-700 [&>p>a]:underline"
            dangerouslySetInnerHTML={{ __html: value.data()!.postContent }}
          ></div>
        </div>
      )}
    </div>
  );
}
