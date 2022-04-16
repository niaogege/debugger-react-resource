/*
 * @Author: Chendapeng
 * @Date: 2022-03-11 17:28:06
 * @LastEditors: Chendapeng
 * @LastEditTime: 2022-04-16 20:49:55
 * @Description: 
 */
import { Component } from "react";
import ClassChild from './child.js'
import FunctionChild from './functionChild'
import './index.scss'

export default class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      title: 'Parent Title'
    }
    console.log('parent constructor');
  }
  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     count: this.state.count + 1
    //   })
    // }, 3000);
    // console.log('parent Mount');
    document.getElementById('btn').addEventListener('click', (e) => {
      console.log(e, 'react+原生： native');
    })
  }
  clickCount = (e) => {
    debugger
    this.setState({
      count: this.state.count + 1
    })
    e.stopPropagation()
  }
  handleNativeAndReact = (e) => {
    console.log(e, 'react+原生： react');
  }
  render() {
    const {count, title} = this.state
    console.log('parent Render');
    return (
      <div className="test-cont">
        <button onClick={this.clickCount}>点击 + 1 {count} React事件</button>
        <button id='btn' onClick={(e) => this.handleNativeAndReact(e)}>点击 + 1 {count} 原生+React事件</button>
        {/* <ClassChild title={title} />
        <FunctionChild title={title} /> */}
      </div>
    )
  }
}