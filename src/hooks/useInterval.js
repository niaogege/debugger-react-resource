import { useEffect, useRef } from "react";
export const useInterval = (cb, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = cb;
  }, [cb]);
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};
