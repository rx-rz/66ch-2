import { doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { database } from "src/config/firebaseConfig";
import { User } from "src/utils";
import { Button } from "../Button";
import moment from "moment";
type NotificationProps = {
  user: User;
};

export const Notifications = ({ user }: NotificationProps) => {
  // defining handleNotifDelete function that accepts an id as an argument
  const handleNotifDelete = (id: string) => {
    // creating a newNotifcations constant by filtering user.notifications array
    // removing the notification that has the id passed as an argument
    const newNotifcations =
      user && user.notifications.filter((notif) => notif.docId !== id);
    // updating the notifications array for the user in the database
    updateDoc(doc(database, "users", user?.id!), {
      notifications: [...newNotifcations!],
    });
  };

  return (
    <div
      className="absolute right-0 lg:top-8 top-12 w-full
      z-50 bg-white text-black shadow-xl   rounded-xl
       min-h-[200px] max-w-[652px]"
    >
      {/*If the notification length of users is more than 0, the following lines of code are rendered. */}
      {user.notifications?.length > 0 ? (
        user.notifications?.map((notif) => (
          <div
            className="py-4 ml-2 flex justify-between items-center w-[95%] mx-auto border-b "
            key={notif.docId}
          >
            <Link
              /*If the notification type is "success", the notification link
            takes the user to the approved post. If it is not, the notification link
            takes the user back to a draft of the submitted post. */
              to={
                notif.type === "success"
                  ? `/post/${notif.docId}`
                  : `/createpost/${notif.docId}`
              }
            >
              <div
                className="w-9/12 "
                /*The code below shows the notifcation message and
              the date it was created. */
              >
                <p className="capitalize md:text-lg  mb-2">{notif.message}</p>
                <p className="lowercase md:text-md text-sm opacity-60">
                  {moment(notif.dateCreated).format("ddd, hA")}
                </p>
              </div>
            </Link>
            <Button
              className="w-fit h-fit"
              /*This deletes the notification */
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
