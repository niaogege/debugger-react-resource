import { useEffect } from "react";
import ThemeDemo from "../../component/themeDemo";
import SuspenseDemo from "../../component/suspend";

export default function Home({ num }) {
  const changeTheme = (e) => {
    const docEle = document.documentElement;
    docEle.setAttribute("data-theme", e);
  };
  useEffect(() => {
    changeTheme("dark");
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => changeTheme("light")}>白色</button>
        <button onClick={() => changeTheme("dark")}>黑色</button>
      </div>
      <ThemeDemo num={num} />
      <br />
      <SuspenseDemo />
    </div>
  );
}
