import { useViewProfile } from "../../api/useViewProfile";

export default function ProfileBanner() {
  const { user } = useViewProfile()!;
  return (
    <div className="mx-2  md:flex block my-16">
      {user && (
        <>
          <img
            className="md:w-4/12 w-full border border-black max-h-profile object-cover"
            src={user.photoURL!}
            alt={user.name!}
          />
          <aside className="md:ml-8 md:w-8/12 w-/12 mt-6 md:mt-0">
            <h1 className="text-4xl md:text-6xl font-medium font-Amulya mb-4 text-tertiary">
              {user.name}
            </h1>
            <h2 className="text-xl md:text-3xl mb-2">Joined {user.dateCreated}</h2>
          </aside>
        </>
      )}
    </div>
  );
}