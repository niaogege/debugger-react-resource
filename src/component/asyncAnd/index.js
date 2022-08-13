import { useState } from "react";
import { useInterval } from "../../hooks/useInterval";
const Counter = () => {
  const [count, setCount] = useState(1);
  const [a, setA] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const handle = () => {
    // setCount(count + 1) // 一次渲染
    // setCount(count + 1)
    setCount((count) => count + 1);
    setCount((count) => count + 1);
    // setTimeout(() => {
    //   setCount(count => count + 1); // 一次渲染
    //   setCount(count => count + 1); // 一次渲染
    // }, 0)
  };
  const handleWithPromise = () => {
    Promise.resolve().then(() => {
      setCount((count) => count + 1);
      setCount((count) => count + 1);
    });
  };
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);
  console.log("render", count);
  return (
    <>
      <div>Count: {count}</div>
      <div>A: {a}</div>
      <button onClick={handle}>同步执行递增</button>
      <button onClick={handleWithPromise}>异步执行递增</button>
      <div>UseInterval: {seconds}</div>
    </>
  );
};
export default Counter;
