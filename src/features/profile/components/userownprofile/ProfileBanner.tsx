import { Link } from "react-router-dom";
import { useUserContext } from "src/context";

export default function ProfileBanner() {
  const { user } = useUserContext()!;
  return (
    <div className="mx-auto w-11/12 block my-20 md:sticky top-36 font-pilcrow dark:text-white">
      {user && (
        <>
          <img
            className=" w-full border border-black max-h-profile object-cover"
            src={user.photoURL!}
            alt={user.name!}
          />
          <aside className=" md:my-12 ">
            <h1 className="text-4xl md:text-6xl font-medium font-Amulya mb-4">
              {user.name}
            </h1>
            <h2 className="text-xl md:text-3xl mb-2">
              {" "}
              Joined {user.dateCreated}
            </h2>
            <Link
              to="/updateprofile"
              className="text-md font-bold text-blue-900 md:text-2xl"
            >
              Update Profile
            </Link>
          </aside>
        </>
      )}
    </div>
  );
}
