import { useViewProfile } from "../../api/useViewProfile";

export default function ProfileBanner() {
  const { user } = useViewProfile()!;
  return (
    <div className="mx-auto w-full md:w-11/12 block my-20 md:sticky top-36 font-pilcrow dark:text-white p-2">
      {user && (
        <>
          <img
            className=" w-full border border-black max-h-profile object-cover min-h-[400px] mb-4"
            src={user.photoURL!}
            alt={user.name!}
          />
          <aside className=" md:my-12 ">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium font-pilcrow mb-8">
              {user.name}
            </h1>
            <h2 className="text-xl md:text-3xl mb-2">
              {" "}
              Joined {user.dateCreated}
            </h2>
          </aside>
        </>
      )}
    </div>
  );
}
