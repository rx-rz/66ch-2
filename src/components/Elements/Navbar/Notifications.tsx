import { doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { database } from "src/config/firebaseConfig";
import { User } from "src/utils";
import { Button } from "../Button";
import deleteButton from "src/assets/delete.svg";

type NotificationProps = {
  user: User;
};

export const Notifications = ({ user }: NotificationProps) => {
  const handleNotifDelete = (id: string) => {
    const newNotifcations =
      user && user.notifications.filter((notif) => notif.docId !== id);
    updateDoc(doc(database, "users", user?.id!), {
      notifications: [...newNotifcations!],
    });
  };

  return (
    <div className="absolute right-0 lg:top-16 top-12 w-full  z-50 bg-black text-white  rounded-xl min-h-[200px] max-w-[652px]">
      {user.notifications?.length > 0 ? (
        user.notifications?.map((notif) => (
          <div className="py-4 ml-2 flex justify-around" key={notif.docId}>
            <Link
              to={
                notif.message === "success"
                  ? `/post/${notif.docId}`
                  : `/createpost/${notif.docId}`
              }
            >
              <div className="w-10/12 ">
                <p>{notif.message}</p>
                <p>{notif.dateCreated}</p>
              </div>
            </Link>
            <Button
              className="w-fit h-fit"
              handleClick={() => handleNotifDelete(notif.docId)}
            >
              <img
                src="/images/delete.svg"
                alt="Delete Notification"
                className="dark:invert"
                width="30px"
              />
            </Button>
          </div>
        ))
      ) : (
        <p className="text-center mt-20 ">You have no new notifications. 😶</p>
      )}
    </div>
  );
};
