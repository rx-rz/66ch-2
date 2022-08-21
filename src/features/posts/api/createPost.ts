import toast from "react-hot-toast";

export const errorToast = () =>
  toast.error(
    "Specify a blog image, tag and description in the post settings",
    {
      style: {
        borderRadius: 0,
        color: "#2F3630",
        backgroundColor: "#EEECE7",
        border: "1px solid #2F3630",
        width: "300px",
      },
      duration: 4000,
    }
  );

export const postContentToast = () =>
  toast.error("Post cannot be empty", {
    style: {
      borderRadius: 0,
      color: "#2F3630",
      backgroundColor: "#EEECE7",
      border: "1px solid #2F3630",
      width: "300px",
    },
    duration: 4000,
  });

export const draftToast = () =>
  toast.success("Draft saved. Check your profile to view drafts.", {
    style: {
      borderRadius: 0,
      color: "#2F3630",
      backgroundColor: "#EEECE7",
      border: "1px solid #2F3630",
      width: "300px",
    },
    duration: 4000,
  });
