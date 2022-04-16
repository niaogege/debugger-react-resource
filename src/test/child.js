/*
 * @Author: Chendapeng
 * @Date: 2022-03-11 17:30:09
 * @LastEditors: Chendapeng
 * @LastEditTime: 2022-03-11 19:39:00
 * @Description: 
 */
import { Component } from "react";
export default class Child extends Component {
  constructor(props) {
    super(props)
    console.log('child constructor');
  }
  componentDidMount() {
    console.log('child Mount');
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.title !== nextProps.title
  // }
  render() {
    const {count, title} = this.props
    console.log('child Render');
    return <div>this is CHild {count} -- {title}</div>
  }
}