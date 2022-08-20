import { doc, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { userConverter } from "src/features/auth/api/userConverter";
import { postConverter } from "src/features/home/api/postConverter";
import { database } from "src/utils/firebaseConfig";

type PostContentProps = {
  status: string;
  authorId: string;
};

export default function PostDetails({ status, authorId }: PostContentProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const postRef = doc(database, "posts", id!).withConverter(postConverter);
  const authorRef = doc(database, "users", authorId!).withConverter(
    userConverter
  );
  const [authorData] = useDocumentData(authorRef);
  const authorNotifications = authorData && authorData.notifications;
  console.log(authorNotifications);
  const acceptPost = () => {
    updateDoc(doc(database, "posts", id!), {
      status: "approved",
    });
    updateDoc(doc(database, "users", authorId!), {
      notifications: [
        { message: "Your post has been approved", type: "sucess" },
      ],
    });
    navigate("/pendingposts");
  };

  const rejectPost = () => {
    updateDoc(doc(database, "users", authorId!), {
      notifications: [
        { message: "Your post has not been approved", type: "sucess" },
      ],
    });
    navigate("/pendingposts");
  };

  const [data, loading, error] = useDocumentData(postRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <div className="mx-auto md:my-36 my-12">
      {error && <strong>{error.message}</strong>}
      {loading && <span>Loading...</span>}

      {data && (
        <div className="mx-auto">
          <div className="w-full md:mb-24  mb-16">
            <header className="md:my-12 my-8 text-center">
              <h1 className="font-bold text-4xl md:text-5xl lg:text-8xl md:mb-10 mb-4 text-tertiary ">
                {data.postTitle}
              </h1>
              <p className="mx-auto max-w-7xl w-11/12 md:text-3xl text-xl">
                {data.description}
              </p>
            </header>
            <img
              src={data.imageDownloadUrl}
              alt=""
              className=" object-cover w-full max-h-details"
              loading="eager"
            />
          </div>
          <div
            className="leading-7 md:text-2xl max-w-4xl mx-auto w-11/12  [&>ol]:list-decimal [&>ol]:ml-10 [&>ul]:list-disc  [&>ul]:ml-10 [&>h1]:md:text-5xl [&>h1]:font-bold [&>h1]:text-4xl [&>h2]:md:text-4xl [&>h2]:text-3xl [&>h2]:font-bold  [&>h3]:md:text-3xl [&>h3]:text-2xl [&>h3]:font-bold [&>a]:text-blue-700 [&>p>a]:underline"
            dangerouslySetInnerHTML={{ __html: data.postContent }}
          ></div>
          {status && authorId && (
            <div>
              <button onClick={acceptPost}>Accept Post</button>
              <button onClick={rejectPost}>Reject Post</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
