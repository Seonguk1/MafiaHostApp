import { useEffect, useState } from "react";
import { database } from "../config/firebase";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";

const useDatabaseQuery = (path, filterKey, filterValue) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataRef = ref(database, path);
    const dataQuery = query(dataRef, orderByChild(filterKey), equalTo(filterValue));

    const unsubscribe = onValue(dataQuery, (snapshot) => {
      setData(snapshot.val());
      setLoading(false);
    });

    return () => unsubscribe();
  }, [path, filterKey, filterValue]);

  return { data, loading };
};

export default useDatabaseQuery;
