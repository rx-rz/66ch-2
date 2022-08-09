import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "src/utils/firebaseConfig";

export default function ProfileBanner() {
  const [user, loading, error] = useAuthState(auth);
  return <div>{user && user.displayName}</div>;
}
