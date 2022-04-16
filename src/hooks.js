/*
 * @Author: Chendapeng
 * @Date: 2022-03-10 15:02:46
 * @LastEditors: Chendapeng
 * @LastEditTime: 2022-03-10 15:25:31
 * @Description: useHover
 */
import { useCallback, useState, useRef } from "react"

export const useHover = () => {
  const [isHovering, setHovering] = useState(false)
  const handleMouseOver = useCallback(() => setHovering(true), [])
  const handleMouseOut = useCallback(() => setHovering(false), [])
  const nodeRef = useRef()
  const callbackRef = useCallback((node) => {
    if (nodeRef.current) {
      nodeRef.current.removeEventListener('mouseover', handleMouseOver)
      nodeRef.current.removeEventListener('mouseout', handleMouseOut)
    }
    nodeRef.current = node
    if (nodeRef.current) {
      nodeRef.current.addEventListener('mouseover', handleMouseOver)
      nodeRef.current.addEventListener('mouseout', handleMouseOut)
    }
  }, [handleMouseOver, handleMouseOut])
  return [callbackRef, isHovering]
}
