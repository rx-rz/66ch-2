import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "src/utils/firebaseConfig";

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleProvider)
    .then()
    .catch((err) => console.log(err));
};
