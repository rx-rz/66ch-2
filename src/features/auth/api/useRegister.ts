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

const auth = getAuth(); // This line gets the authentication object
const date = new Date(); // This line creates a new Date object

/*This line creates a new GoogleAuthProvider object 
for use with the Google authentication method*/
const googleProvider = new GoogleAuthProvider();

/*This line creates a reference to the "users" collection in the database, 
using the userConverter function to convert documents to custom objects*/
const ref = collection(database, "users").withConverter(userConverter);

//This line creates a reference to the "users" collection in the database
const usersRef = collection(database, "users");

export const useRegister = () => {
  /*This line uses the "useCollectionData" hook to get the data from the "ref"
  collection and assigns the returned value to the "users" state*/
  const [users] = useCollectionData(ref);
  /*This line creates a state variable "pending" with a default value 
  of false, and a "setPending" function to update its value.*/
  const [pending, setPending] = useState(false);

  /* This line uses the "useNavigate" hook which is used to 
  programmatically navigate to different routes */
  const navigate = useNavigate();

  function binarySearch(
    userList: DatabaseUser[] | undefined,
    correctUser: User
  ) {
    /* largest variable is assigned the value of the last index of userList
     if userList is truthy, otherwise -1 */
    let largest = userList && userList.length - 1;
    // smallest variable is assigned 0
    let smallest = 0;
    //  While loop continues until smallest is greater than largest
    while (smallest <= largest!) {
      // middle of the array is calculated
      let middle = Math.floor(largest! + smallest);
      //guess variable  is assigned the user at index 'middle'
      const guess = userList![middle];
      //if the uid of guess variable is equal to the correctUser.uid return true
      if (guess.uid === correctUser.uid) {
        return true;
      }
      // if guess variable's uid is greater than correctUser.uid , largest variable is set to middle -1
      if (guess.uid > correctUser.uid) {
        largest = middle - 1;
      } else {
        // otherwise smallest variable is set to middle + 1
        smallest = middle + 1;
      }
    }
  }

  const handleRegistration = async (data: RegisterFormValues) => {
    try {
      // Set pending state to true to indicate registration request in progress
      setPending(true);

      // Create new user with email and password using Firebase Authentication
      await createUserWithEmailAndPassword(auth, data.email, data.password)
        // If user is successfully created, update the profile with display name and photo URL
        // and add the user to the "users" collection with additional information
        .then((user) => {
          updateProfile(user.user, {
            displayName: data.firstName + " " + data.lastName,
            photoURL: process.env.REACT_APP_DEFAULT_PFP,
          }).catch((err) => errorToast(err)); // Show error message on UI if update profile failed
          addDoc(usersRef, {
            name: data.firstName + " " + data.lastName,
            photoURL: process.env.REACT_APP_DEFAULT_PFP,
            uid: user.user.uid,
            dateCreated: date.toUTCString(),
            role: "writer",
            notifications: [],
          }).catch((err) => errorToast(err)); // Show error message on UI if addDoc failed
        });

      // Redirect user to the homepage
      navigate("/");
      // Set pending state to false once registration is completed
      setPending(false);
    } catch (err: unknown) {
      // Check if the error is a FirebaseError, if so, set pending to false and show error message on UI
      if (err instanceof FirebaseError) {
        setPending(false);
        errorToast(err);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Sign in user with google provider using Firebase Authentication
      await signInWithPopup(auth, googleProvider).then((user) => {
        // Add the user to the "users" collection with additional information
        // like name, photoURL, uid, and dateCreated
        addDoc(usersRef, {
          name: user.user.displayName,
          photoURL: process.env.REACT_APP_DEFAULT_PFP,
          uid: user.user.uid,
          dateCreated: date.toUTCString(),
        }).catch((err) => errorToast(err)); // Show error message on UI if addDoc failed

        // Check if the user is already in the database
        const userInDatabase = binarySearch(users, user.user);
        if (userInDatabase === true) {
          // Add the user to the specified collection with additional information like role and notifications
          addDoc(collection(database, "users"), {
            name: user.user.displayName,
            photoURL: process.env.REACT_APP_DEFAULT_PFP,
            uid: user.user.uid,
            dateCreated: date.toUTCString(),
            role: "writer",
            notifications: [],
          }).catch((err) => errorToast(err)); // Show error message on UI if addDoc failed
        }
      });

      // Redirect user to the homepage
      navigate("/");
    } catch (err: unknown) {
      // Check if the error is a FirebaseError, if so, show error message on UI
      if (err instanceof FirebaseError) {
        errorToast(err);
      }
    }
  };

  return { signInWithGoogle, handleRegistration, pending };
};
