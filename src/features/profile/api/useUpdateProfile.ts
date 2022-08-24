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
  const { url , progress} = usePostImage(file);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  const handleChange = (e: any) => {
    let selectedFile = e;
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        setFile(selectedFile);
      }
    }
  };

  const handleProfileUpdate = async (data: UpdateFormValues) => {
    setPending(true);
    await updateProfile(user!, {
      displayName:
        (data.firstName  ?? "First Name") +
        " " +
        (data.lastName  ?? "Last Name"),
      photoURL: url ?? user!.photoURL,
    });

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

  return { handleChange, handleProfileUpdate, namesOfUser, pending, progress };
};
