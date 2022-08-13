import { memo, useCallback, useState } from "react";
import { useHover } from "../../hooks";
import "./index.scss";
import ChildTry from "./child";
/*
 * @Author: Chendapeng
 * @Date: 2022-03-09 19:09:16
 * @LastEditors: Chendapeng
 * @LastEditTime: 2022-05-04 22:03:49
 * @Description:
 */
const Child = ({ theme = "" }) => {
  const [num, setNum] = useState("cpp");
  // const [hoverRef, isHovering] = useHover();
  const someFunc = useCallback(() => {
    console.log("print useCallback");
    setNum("cpp+wmh");
  }, []);
  return (
    <section
      // ref={hoverRef}
      className="child"
      style={{
        margin: "10px auto",
      }}
    >
      {theme} --- child
      {/* {isHovering ? "inner" : "out"} */}
      <ChildTry someFunc={someFunc} num={num} />
    </section>
  );
};
// const MemoChild = memo(Child)
export default Child;
