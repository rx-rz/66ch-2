
import { useQuery } from "@tanstack/react-query";
import {   GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "src/utils/firebaseConfig";

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {

  const  {user}= await signInWithPopup(auth, googleProvider);
};

const onSuccess = () => {
  window.location.href = "/";
};

export const useGoogleSignIn = () => {
  return useQuery(["user"], signInWithGoogle, {onSuccess});
};
