import { getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";

const useGetData = (docRef) => {
  const [pending, setPending] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  try {
    useEffect(() => {
      const getData = async () => {
        const doc = await getDocs(docRef);
        setData(doc.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getData();
      setPending(false);
    }, [pending]);
  } catch (err) {
    setError(err.message);
  }
  return { data, error, pending };
};

export default useGetData;
