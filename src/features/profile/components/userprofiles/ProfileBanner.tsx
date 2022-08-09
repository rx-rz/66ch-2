import { User } from "firebase/auth";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { postConverter } from "src/features/posts/api/postConverter";
import useGetData from "src/hooks/useGetData";
import useGetSingleData from "src/hooks/useGetSingleData";
import { database } from "src/utils/firebaseConfig";

export default function ProfileBanner() {
    const {id} = useParams()
    const userRef = collection(database, "users", id!);
    const {data, error} = useGetSingleData(userRef)

    console.log(data)

  return <div></div>;
}
