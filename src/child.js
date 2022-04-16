import { memo } from "react";
import {useHover} from './hooks'
/*
 * @Author: Chendapeng
 * @Date: 2022-03-09 19:09:16
 * @LastEditors: Chendapeng
 * @LastEditTime: 2022-04-16 21:36:07
 * @Description: 
 */
const Child = ({
  theme = ''
}) => {
  const [hoverRef, isHovering] = useHover()
  return (
    <section 
    ref={hoverRef}
    className="child"
    style={{
      width: 500,
      height: 300,
      margin: '10px auto',
      border: '1px solid red',
    }}
    >
      {theme} --- child {isHovering ? 'inner' : 'out'}
    </section>
  )
}
const MemoChild = memo(Child)
export default MemoChild