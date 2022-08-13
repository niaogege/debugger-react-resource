import { memo } from "react";
const tryCallback = ({ someFunc, num }) => {
  console.log("try child callback");
  return <div onClick={someFunc}>this is test call back child--{num}</div>;
};

export default tryCallback;
