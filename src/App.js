/*
 * @Author: Chendapeng
 * @Date: 2022-03-02 15:38:05
 * @LastEditors: Chendapeng
 * @LastEditTime: 2022-04-16 23:52:46
 * @Description: 
 */
import './App.css';
import {useEffect, useMemo, useRef, useState} from 'react'
import ThemeDemo from './component/themeDemo';
// import ProgressBarCircle from './component/parent'

function App() {
  const [num, updateNum] = useState(11)
  useState('emptyUseState')
  // const clickApp = useCallback((e) => {
  //   console.log(e);
  // }, [])
  useEffect(() => {
    updateNum(22)
    console.log('useEffect');
  }, [])
  useRef('useRef')
  useMemo(()=> {
    return 'UseMem'
  }, [])

  const changeTheme = (e) => {
    const docEle = document.documentElement;
    docEle.setAttribute('data-theme', e)
  }
  useEffect(() => {
    changeTheme('dark')
  }, [])
  return (
    <div className="App" 
      style={{
        margin: '0 auto',
        width: '100%',
        height: '100%'
      }}
    >
      <div>
        <button onClick={() => changeTheme('light')}>白色</button>
        <button onClick={() => changeTheme('dark')}>黑色</button>
      </div>
      <ThemeDemo num={num} /><br />
    </div>
  );
}

export default App;
