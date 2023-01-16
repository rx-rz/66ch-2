import { updateProfile } from "firebase/auth";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { auth, database } from "src/config/firebaseConfig";
import { useUserContext } from "src/context";
import { usePostImage } from "src/hooks/usePostImage";
import {
  blogConverter,
  commentConverter,
  draftConverter,
  replyConverter,
  userConverter,
} from "src/utils";

type UpdateFormValues = {
  firstName: string;
  lastName: string;
  profileUrl: string;
};

const postsRef = collection(database, "posts").withConverter(blogConverter);
const usersRef = collection(database, "posts").withConverter(userConverter);
const commentsRef = collection(database, "comments").withConverter(
  commentConverter
);
const repliesRef = collection(database, "replies").withConverter(
  replyConverter
);
const draftsRef = collection(database, "drafts").withConverter(draftConverter);

export const useUpdateProfile = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { user: currentUser } = useUserContext()!;
  // console.log(user && user.uid )
  // console.log(currentUser && currentUser.id)

  const [posts] = useCollectionData(postsRef);
  const [comments] = useCollectionData(commentsRef);
  const [replies] = useCollectionData(repliesRef);
  const [drafts] = useCollectionData(draftsRef);
  const [users] = useCollectionData(usersRef);

  const userPosts = posts?.filter((doc) => doc.author.id === user?.uid);
  const userDocuments = users?.filter((doc) => doc.uid === user?.uid);
  const userComments = comments?.filter(
    (doc) => doc.commentAuthorId === user?.uid
  );
  const userReplies = replies?.filter((doc) => doc.replyAuthorId === user?.uid);
  const userDrafts = drafts?.filter((doc) => doc.author.id === user?.uid);
  const namesOfUser = currentUser && currentUser.name!.split(" ");

  const [pending, setPending] = useState(false);
  const [file, setFile] = useState<File>({} as File);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const { url, progress } = usePostImage(file);

  useEffect(() => {
    // Log current user in the console
    console.log(currentUser);
  }, [currentUser]);

  const handleImageChange = (e: File) => {
    // assign the selected file to a variable
    let selectedFile = e;
    // check if the selected file is not null
    if (selectedFile) {
      // check if the file type is included in the types array
      if (types.includes(selectedFile.type)) {
        // set the file state
        setFile(selectedFile);
      } else {
        // set the file state
        setFile(selectedFile);
      }
    }
  };

  const handleProfileUpdate = async (data: UpdateFormValues) => {
    setPending(true);
    /* Call updateProfile function and pass in the user object, as well as an object 
    with the displayName and photoURL properties.The displayName is a 
    concatenation of the firstName and lastName, using a fallback value of 
    "First Name" and "Last Name" respectively if they are null.
    The photoURL property is set to the URL value if it's not null, 
    otherwise it keeps the current user's photoURL. `*/
    await updateProfile(user!, {
      displayName:
        (data.firstName ?? "First Name") + " " + (data.lastName ?? "Last Name"),
      photoURL: url ?? user!.photoURL,
    });

    /* Call updateDoc function, passing in the doc object, database, "users", and the current user's id. 
    An object with name and photoURL properties is passed as the second argument.
    The name property is a concatenation of the firstName and lastName, 
    using the fallback value of namesOfUser![0] and namesOfUser![1] respectively
     if they are null. The photoURL property is set to the URL value if it's not null,
      otherwise it keeps the current user's photoURL. */
    await updateDoc(doc(database, "users", currentUser!.id), {
      name:
        (data.firstName ?? namesOfUser![0]) +
        " " +
        (data.lastName ?? namesOfUser![1]),
      photoURL: url ?? user!.photoURL,
    });

    userPosts &&
      userPosts!.forEach(async (document) => {
        const postsRef = doc(database, "posts", document.id);
        await updateDoc(postsRef, {
          author: { name: user!.displayName, id: user!.uid },
        });
      });

    userDocuments &&
      userDocuments!.forEach(async (document) => {
        const usersRef = doc(database, "users", document.uid);
        await updateDoc(usersRef, {
          name: data.firstName + " " + data.lastName,
        });
      });

    userReplies &&
      userReplies!.forEach(async (document) => {
        const repliesRef = doc(database, "replies", document.id);
        await updateDoc(repliesRef, {
          replyAuthor: data.firstName + " " + data.lastName,
        });
      });

    userComments &&
      userComments!.forEach(async (document) => {
        const commentsRef = doc(database, "replies", document.id);
        await updateDoc(commentsRef, {
          commentAuthor: data.firstName + " " + data.lastName,
        });
      });

    userDrafts &&
      userDrafts!.forEach(async (document) => {
        const draftsRef = doc(database, "drafts", document.id);
        await updateDoc(draftsRef, {
          author: { name: user!.displayName, id: user!.uid },
        });
      });

    setPending(false);
    navigate("/profile");
  };

  return {
    handleImageChange,
    handleProfileUpdate,
    namesOfUser,
    pending,
    progress,
  };
};
