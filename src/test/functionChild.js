/*
 * @Author: Chendapeng
 * @Date: 2022-03-11 18:22:54
 * @LastEditors: Chendapeng
 * @LastEditTime: 2022-03-11 19:16:15
 * @Description: 
 */
import { memo } from "react";

const FunctionChild = ({count}) => {
  console.log('Function CHild');
  return (
    <div>This is Function {count}</div>
  )
}

export default memo(FunctionChild)