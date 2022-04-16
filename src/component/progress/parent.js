/*
 * @Author: Chendapeng
 * @Date: 2022-03-26 20:23:10
 * @LastEditors: Chendapeng
 * @LastEditTime: 2022-04-16 21:38:33
 * @Description: 父组件如何使用circle组件
 */
import { useState } from 'react'
import SoundCircleProgress from './progress'

const Parent = () => {
  const [count, setCount] = useState(0)
  const add = () => {
    setCount((num) => num + 10)
  }
  return (
    <div style={{
      margin: '100px auto',
      width: '100%',
      padding: '20px',
      // background: 'pink'
    }}
    >
    <SoundCircleProgress 
      currentTime={count}
      duration={300}
      radiusLen={16} // radius
      strokeLength={5} // 弧度宽度
      status // 播放状态
    />
    <br />
    <h1>
      <button onClick={add}> + 10== {count}</button>
    </h1>
    </div>
  )
}

export default Parent