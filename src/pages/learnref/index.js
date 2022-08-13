import { useRef, forwardRef, useImperativeHandle } from "react";
function MyInput(props, ref) {
  const displayName = () => {
    alert("CPP");
  };
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    displayName,
    zice() {
      realInputRef.current.focus();
    },
  }));
  return (
    <div>
      THis is Test
      <input ref={realInputRef} />
    </div>
  );
}
const MyInputF = forwardRef(MyInput);

function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.displayName();
    inputRef.current.zice();
  }
  return (
    <>
      <MyInputF ref={inputRef} />
      <button onClick={handleClick}>input聚焦</button>
    </>
  );
}

export default Form;
