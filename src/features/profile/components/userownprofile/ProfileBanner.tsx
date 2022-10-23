import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "src/context";

export default function ProfileBanner() {
  const { user } = useUserContext()!;

  useEffect(() => {
    document.title = `${user?.name} - Profile`;
  }, [user]);

  return (
    <div
      className="mx-auto md:w-11/12 block
   font-pilcrow dark:text-white p-2 mt-4"
    >
      {user && (
        <div className="flex items-center">
          <img
            className=" md:w-3/12 w-4/12 border border-white rounded-full
              max-h-profile object-cover md:mb-4 aspect-square"
            src={user.photoURL!}
            alt={user.name!}
          />
          <aside className="md:w-9/12 w-8/12 ml-16 mt-8">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl
           font-medium font-pilcrow md:mb-4 mb-1"
            >
              {user.name}
            </h1>
            <h2 className="text-md md:text-xl lg:text-2xl mb-2">
              Joined {user.dateCreated}
            </h2>
            <div className="flex flex-wrap">
              <Link
                to="/updateprofile"
                className="text-md font-bold text-secondary md:text-2xl
                 flex items-center mr-8 md:mb-0 mb-2"
              >
                <img
                  src="/assets/update.svg"
                  alt="Update Profile"
                  className="mr-2 dark:invert"
                  width="30px"
                />
                <p>Edit Profile </p>
              </Link>
              <Link
                to="/updateprofile"
                className="text-md font-bold text-secondary
                 md:text-2xl flex items-center"
              >
                <img
                  src="/assets/deleteprofile.svg"
                  alt="Delete Profile"
                  className="mr-2 dark:invert"
                  width="30px"
                />
                <p>Delete Profile </p>
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
