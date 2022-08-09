import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "src/utils/firebaseConfig";

export default function ProfileBanner() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className="w-11/12 mx-auto flex flex-wrap my-16">
      {user && (
        <>
          <img src={user.photoURL!} alt={user.displayName!} />
          <aside className="ml-5">
            <h1 className="text-5xl text-justify md:text-6xl font-medium font-Amulya mb-4 ">{user.displayName}</h1>
            <h1 className="text-4xl">Joined 9th of August, 2022</h1>
          </aside>
        </>
      )}
    </div>
  );
}
