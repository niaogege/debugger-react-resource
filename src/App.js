/*
 * @Author: Chendapeng
 * @Date: 2022-03-02 15:38:05
 * @LastEditors: Chendapeng
 * @LastEditTime: 2022-08-13 11:28:19
 * @Description:
 */
import "./App.css";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Home from "./pages/home";
import About from "./pages/about";
import LearnRef from "./pages/learnref";
// import ProgressBarCircle from './component/parent'
import { Routes, Route, Link } from "react-router-dom";
function App() {
  const [num, updateNum] = useState("num");
  useState("emptyUseState");
  const clickApp = useCallback((e) => {
    // console.log(e);
  }, []);
  useEffect(() => {
    updateNum(22);
  }, []);
  useRef("useRef");
  useMemo(() => {
    return "UseMem";
  }, []);
  return (
    <div
      className="App"
      // onClick={clickApp}
      style={{
        margin: "0 auto",
        width: "100%",
        height: "100%",
      }}
    >
      <section>
        <nav>
          <Link to="/">Home</Link> | <Link to="about">About</Link> |{" "}
          <Link to="ref">Ref</Link>
        </nav>
      </section>
      <Routes>
        <Route path="/" element={<Home num={num} />} />
        <Route path="about" element={<About />} />
        <Route path="ref" element={<LearnRef />} />
      </Routes>
    </div>
  );
}
export default App;
