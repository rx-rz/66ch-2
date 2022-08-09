import { getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";

export const useGetSingleData = (docRef) => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(true);

  try {
    useEffect(() => {
      const getData = async () => {
        const doc = await getDoc(docRef);
        if (doc.exists()) {
          setData({ ...doc.data(), id: doc.id });
        }
      };
      getData();
      setPending(false);
    }, [pending]);
  } catch (err) {
    setError(err.message);
  }
  return { data, error, pending };
};

export default useGetSingleData;
