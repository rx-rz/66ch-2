import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { auth, database } from "src/config/firebaseConfig";
import { User as DatabaseUser, userConverter } from "src/utils";
import { toast } from "react-hot-toast";
import { FirebaseError } from "firebase/app";

function replaceErrorDiscrepancies(x: string) {
  return x
    .replace("Firebase: Error", "")
    .replace("(auth/", "")
    .replace("-", " ")
    .replace(")", "");
}

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

type LoginFormValues = {
  email: string;
  password: string;
};

const date = new Date();

const googleProvider = new GoogleAuthProvider();
/*creates a new GoogleAuthProvider object, which allows you
 to authenticate and authorize users using Google Sign-In.*/

const ref = collection(database, "users").withConverter(userConverter);
/* creates a new reference object that points to a specific collection within 
a Firestore database. The collection is called "users" and the `withConverter` 
method is used to set a "converter" function that can be used to automatically 
convert between Firestore documents and your own custom objects when 
reading and writing data. */

export const useLogin = () => {
  /* This line is using the "useCollectionData" hook to get the data from the "ref" collection,
  which is a reference to a collection in the database,
  and assigns the returned value to the "users" state. */
  const [users] = useCollectionData(ref);

  /* This line creates a state variable "pending" with a default value of false,
  and a "setPending" function to update its value to indicate a pending
   status of an action */
  const [pending, setPending] = useState(false);

  /*This line uses the "useNavigate" hook which is used to 
  programmatically navigate to different routes in creating a constant*/
  const navigate = useNavigate();

  /*to speed up user search in the firestore database during login,
  a binary search function is used. */
  function binarySearch(
    userList: DatabaseUser[] | undefined,
    correctUser: User
  ) {
    /* largest variable is assigned the value of the last index 
    of userList if userList is truthy, otherwise -1 */
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
      /* if guess variable's uid is greater than correctUser.uid ,
       largest variable is set to middle -1 */
      if (guess.uid > correctUser.uid) {
        largest = middle - 1;
      } else {
        // otherwise smallest variable is set to middle + 1
        smallest = middle + 1;
      }
    }
  }

  const signInWithGoogle = async () => {
    try {
      /* Sign in with Google using Firebase's `signInWithPopup`
      function, passing in the auth instance and googleProvider */
      await signInWithPopup(auth, googleProvider)
        // When the sign-in is successful, check if the user is already in the database
        .then((user) => {
          //if user is in the database
          const userInDatabase = binarySearch(users, user.user);
          if (userInDatabase === true) {
            // add user to the users collection of the database
            addDoc(collection(database, "users"), {
              name: user.user.displayName,
              photoURL: process.env.REACT_APP_DEFAULT_PFP,
              uid: user.user.uid,
              dateCreated: date.toUTCString(),
              role: "writer",
              notifications: [],
            });
          }
        })
        //catch any error
        .catch((err) => console.log(err));
      // navigate to home page on successful sign in
      navigate("/");
    } catch (err: unknown) {
      // if the error is a FirebaseError, call the errorToast function
      if (err instanceof FirebaseError) {
        errorToast(err);
      }
    }
  };

  const handleSignIn = async (data: LoginFormValues) => {
    try {
      // set the pending state to true, indicating that the sign-in request is in progress
      setPending(true);
      // call the function to sign in with the provided email and password
      await signInWithEmailAndPassword(auth, data.email, data.password);
      // set the pending state to false, indicating that the sign-in request has completed
      setPending(false);
      // navigate to the home page
      navigate("/");
    } catch (err: unknown) {
      // check if the error is an instance of FirebaseError
      if (err instanceof FirebaseError) {
        // set the pending state to false
        setPending(false);
        // call the function to display an error toast with the error message
        errorToast(err);
      }
    }
  };

  return { handleSignIn, signInWithGoogle, pending };
};
