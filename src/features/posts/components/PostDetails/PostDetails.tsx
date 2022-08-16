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
        <div className="mx-auto text-center">
          <div className="w-full md:mb-24  mb-16">
            <div className="md:my-12 my-8">
              <h1 className="font-bold text-4xl md:text-5xl lg:text-8xl md:mb-10 mb-4 text-tertiary ">
                {value.data()!.postTitle}
              </h1>
              <p className="mx-auto max-w-7xl w-11/12 md:text-3xl text-xl">
                {value.data()!.description}
              </p>
            </div>
            <img
              src={value.data()!.imageDownloadUrl}
              alt=""
              className=" object-cover w-full max-h-details"
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
