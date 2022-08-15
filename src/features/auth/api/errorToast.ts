import { toast } from "react-hot-toast";
function replaceErrorDiscrepancies(x: string) {
  return x
    .replace("Firebase: Error", "")
    .replace("(auth/", "")
    .replace("-", " ")
    .replace(")", "");
}

export const errorToast = (err: any) =>
  toast.error(replaceErrorDiscrepancies(err.message), {
    style: {
      borderRadius: 0,
      color: "#2F3630",
      backgroundColor: "#EEECE7",
      border: "1px solid #2F3630",
      width: "300px",
    },
    duration: 4000,
  });
