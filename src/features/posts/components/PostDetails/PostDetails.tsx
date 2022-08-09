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
    <div className="mx-auto md:mt-36 mt-12 w-11/12">
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Document: Loading...</span>}

      {value && (
        <div>
          <div className="w-11/12 md:w-9/12 md:mb-24 mb-16">
            <div className="flex mb-8">
            <p className=" text-xl md:text-2xl mr-6">{value.data()!.author.name} </p>
            <p className=" text-xl md:text-2xl">{value.data()!.dateCreated}</p>

            </div>
            <h1 className="font-bold text-5xl md:text-7xl md:mb-24 mb-16 ">{value.data()!.postTitle}</h1>
            <img src={value.data()!.imageDownloadUrl} alt="" className=" object-cover"/>
          </div>
          <div
          className="text-lg md:text-2xl max-w-3xl w-11/12 [&>strong:text-4xl]"
            dangerouslySetInnerHTML={{ __html: value.data()!.postContent }}
          ></div>
        </div>
      )}
    </div>
  );
}
