import { doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { database } from "src/config/firebaseConfig";
import { User } from "src/utils";
import { Button } from "../Button";
import moment from "moment"
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
    <div className="absolute right-0 lg:top-8 top-12 w-full  z-50 bg-white text-black shadow-xl   rounded-xl min-h-[200px] max-w-[652px]">
      {user.notifications?.length > 0 ? (
        user.notifications?.map((notif) => (
          <div
            className="py-4 ml-2 flex justify-between items-center w-[95%] mx-auto border-b "
            key={notif.docId}
          >
            <Link
              to={
                notif.type === "success"
                  ? `/post/${notif.docId}`
                  : `/createpost/${notif.docId}`
              }
            >
              <div className="w-9/12 ">
                <p className="capitalize md:text-lg  mb-2">
                  {notif.message}
                </p>
                <p className="lowercase md:text-md text-sm opacity-60">
                  {moment(notif.dateCreated).format("ddd, hA")}
                </p>
              </div>
            </Link>
            <Button
              className="w-fit h-fit"
              handleClick={() => handleNotifDelete(notif.docId)}
            >
              <img
                src="/assets/delete.svg"
                alt="Delete Notification"
                className="md:w-[40px] w-[20px]"
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
