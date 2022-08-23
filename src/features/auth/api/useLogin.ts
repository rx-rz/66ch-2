import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { auth, database } from "src/config/firebaseConfig";
import { userConverter } from "src/utils";

import { toast } from "react-hot-toast";
function replaceErrorDiscrepancies(x: string) {
  return x
    .replace("Firebase: Error", "")
    .replace("(auth/", "")
    .replace("-", " ")
    .replace(")", "");
}

const errorToast = (err: any) =>
  toast.error(replaceErrorDiscrepancies(err.message), {
    style: {
      borderRadius: 0,
      color: "#2F3630",
      backgroundColor: "#EEECE7",
      border: "1px solid #2F3630",
      width: "300px",
    },
    duration: 4000,
  });

type LoginFormValues = {
    email: string;
    password: string;
  };
  
  const date = new Date()

  const googleProvider = new GoogleAuthProvider();
  const ref = collection(database, "users").withConverter(userConverter);

  export const useLogin = () => {

    const [users] = useCollectionData(ref);
    const [pending, setPending] = useState(false);
    const navigate = useNavigate()
  
    const signInWithGoogle = async () => {
      try {
        await signInWithPopup(auth, googleProvider)
          .then((user) => {
            const usersInDatabase =
              users &&
              users.filter(
                (usersInDatabase) => usersInDatabase.uid === user.user.uid
              );
            if (usersInDatabase!.length === 0) {
              addDoc(collection(database, "users"), {
                name: user.user.displayName,
                photoURL: process.env.REACT_APP_DEFAULT_PFP,
                uid: user.user.uid,
                dateCreated: date.toUTCString(),
                role: "writer",
                notifications: []
              })
            }
          })
          .catch((err) => console.log(err));
        navigate("/");
      } catch (err: any) {
        errorToast(err);
      }
    };
  
    const handleSignIn = async (data: LoginFormValues) => {
      try {
        setPending(true);
        await signInWithEmailAndPassword(auth, data.email, data.password);
        setPending(false);
        navigate("/");
      } catch (err: any) {
        setPending(false);
        errorToast(err);
      }
    };
  
    return {handleSignIn, signInWithGoogle, pending}

  }