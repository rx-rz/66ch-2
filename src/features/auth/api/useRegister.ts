import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  User,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { database } from "src/config/firebaseConfig";
import { User as DatabaseUser, userConverter } from "src/utils";

function replaceErrorDiscrepancies(x: string) {
  return x
    .replace("Firebase: Error", "")
    .replace("(auth/", "")
    .replace("-", " ")
    .replace(")", "");
}

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const errorToast = (err: FirebaseError) =>
  toast.error(replaceErrorDiscrepancies(err.message), {
    style: {
      borderRadius: 0,
      color: "white",
      backgroundColor: "#121212",
      border: "2px solid #0437F2",
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

  function binarySearch(
    userList: DatabaseUser[] | undefined,
    correctUser: User
  ) {
    let largest = userList && userList.length - 1;
    let smallest = 0;
    while (smallest <= largest!) {
      let middle = Math.floor(largest! + smallest);
      const guess = userList![middle];
      if (guess.uid === correctUser.uid) {
        return true;
      }
      if (guess.uid > correctUser.uid) {
        largest = middle - 1;
      } else {
        smallest = middle - 1;
      }
    }
  }

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
        }).catch((err) => errorToast(err));
        addDoc(usersRef, {
          name: data.firstName + " " + data.lastName,
          photoURL: process.env.REACT_APP_DEFAULT_PFP,
          uid: user.user.uid,
          dateCreated: date.toUTCString(),
          role: "writer",
          notifications: [],
        }).catch((err) => errorToast(err));
      });
      navigate("/");
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
        }).catch((err) => errorToast(err));
        const userInDatabase = binarySearch(users, user.user);
        if (userInDatabase === true) {
          addDoc(collection(database, "users"), {
            name: user.user.displayName,
            photoURL: process.env.REACT_APP_DEFAULT_PFP,
            uid: user.user.uid,
            dateCreated: date.toUTCString(),
            role: "writer",
            notifications: [],
          }).catch((err) => errorToast(err));
        }
      });
      navigate("/");
    } catch (err: any) {
      setPending(false);
      errorToast(err);
    }
  };

  return { signInWithGoogle, handleRegistration, pending };
};
