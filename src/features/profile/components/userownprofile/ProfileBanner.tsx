import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "src/utils/firebaseConfig";

export default function ProfileBanner() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className="w-11/12 mx-auto md:flex block my-16">
      {user && (
        <>
          <img className="md:w-4/12 w-full" src={user.photoURL!} alt={user.displayName!} />
          <aside className="md:ml-8 md:w-8/12 w-/12 mt-6 md:mt-0">
            <h1 className="text-4xl md:text-6xl font-medium font-Amulya mb-4">{user.displayName}</h1>
            <h2 className="text-xl md:text-3xl mb-2">{user.email}</h2>
            <Link to="/updateprofile" className="text-md font-bold text-blue-900 md:text-2xl">Update Profile</Link>
          </aside>
        </>
      )}
    </div>
  );
}
