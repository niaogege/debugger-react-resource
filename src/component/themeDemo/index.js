import { memo } from "react";
import {useHover} from '../../hooks'
import './index.scss'
/*
 * @Author: Chendapeng
 * @Date: 2022-03-09 19:09:16
 * @LastEditors: Chendapeng
 * @LastEditTime: 2022-04-17 17:38:14
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
      margin: '10px auto',
    }}
    >
      {theme} --- child {isHovering ? 'inner' : 'out'}
    </section>
  )
}
const MemoChild = memo(Child)
export default MemoChild