import { database } from "../config/firebase";
import { ref, set, update, remove } from "firebase/database";

const useDatabaseWrite = () => {
  // 데이터 설정 (set)
  const setData = async (path, value) => {
    try {
      await set(ref(database, path), value);
      console.log("데이터 저장 완료:", value);
    } catch (error) {
      console.error("데이터 저장 오류:", error);
    }
  };

  // 데이터 업데이트 (update)
  const updateData = async (path, value) => {
    try {
      await update(ref(database, path), value);
      console.log("데이터 업데이트 완료:", value);
    } catch (error) {
      console.error("데이터 업데이트 오류:", error);
    }
  };

  // 데이터 삭제 (remove)
  const removeData = async (path) => {
    try {
      await remove(ref(database, path));
      console.log("데이터 삭제 완료:", path);
    } catch (error) {
      console.error("데이터 삭제 오류:", error);
    }
  };

  return { setData, updateData, removeData };
};

export default useDatabaseWrite;
