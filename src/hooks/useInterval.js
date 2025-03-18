import { useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // 최신 callback을 저장
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 인터벌 설정
  useEffect(() => {
    if (delay === null) return; // delay가 null이면 실행 안 함

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id); // 컴포넌트 언마운트 시 인터벌 해제
  }, [delay]);
}

export default useInterval;
