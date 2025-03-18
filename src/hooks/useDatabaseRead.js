import { useEffect, useState } from "react";
import { database } from "../config/firebase";
import { ref, onValue, get } from "firebase/database";

const useDatabaseRead = (path, isRealtime = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataRef = ref(database, path);

    if (isRealtime) {
      // 실시간 데이터 구독
      const unsubscribe = onValue(dataRef, (snapshot) => {
        setData(snapshot.val());
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // 단일 조회
      get(dataRef)
        .then((snapshot) => {
          setData(snapshot.val());
          setLoading(false);
        })
        .catch((error) => {
          console.error("데이터 읽기 오류:", error);
          setLoading(false);
        });
    }
  }, [path, isRealtime]);

  return { data, loading };
};

export default useDatabaseRead;
