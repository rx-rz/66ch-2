import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { database } from "src/config/firebaseConfig";
import { userConverter } from "src/utils";

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const errorToast = (err: any) =>
  toast.error(err.message, {
    style: {
      borderRadius: 0,
      color: "#2F3630",
      backgroundColor: "#EEECE7",
      border: "1px solid #2F3630",
      width: "300px",
    },
    duration: 4000,
  });

const auth = getAuth();
const date = new Date();
const googleProvider = new GoogleAuthProvider();

const ref = collection(database, "users").withConverter(userConverter);
const usersRef = collection(database, "users");

export const useRegister = () => {
  const [users] = useCollectionData(ref);
  const [pending, setPending] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = async (data: RegisterFormValues) => {
    try {
      setPending(true);
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then((user) => {
        updateProfile(user.user, {
          displayName: data.firstName + " " + data.lastName,
          photoURL: process.env.REACT_APP_DEFAULT_PFP,
        });
        addDoc(usersRef, {
          name: data.firstName + " " + data.lastName,
          photoURL: process.env.REACT_APP_DEFAULT_PFP,
          uid: user.user.uid,
          dateCreated: date.toUTCString(),
          role: "writer",
          notifications: []
        });
        navigate("/");
      });
      setPending(false);
    } catch (err: any) {
      setPending(false);
      errorToast(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((user) => {
        addDoc(usersRef, {
          name: user.user.displayName,
          photoURL: process.env.REACT_APP_DEFAULT_PFP,
          uid: user.user.uid,
          dateCreated: date.toUTCString(),
        });
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
          });
        }
      });
      navigate("/");
    } catch (err: any) {
      setPending(false);
      errorToast(err);
    }
  };
  return {signInWithGoogle, handleRegistration, pending}
};
