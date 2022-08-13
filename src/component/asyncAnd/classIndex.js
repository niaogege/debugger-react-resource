import { Component } from "react";

class ClassIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 0,
    };
  }
  componentDidMount() {
    console.log("child ComponentDidMount");
  }
  componentWillUnmount() {
    console.log("child componentWillUnmount");
  }
  handle = () => {
    // this.setState(count + 1) // 一次渲染
    // this.setState(count + 1)
    this.setState({ a: this.state.a + 1 });
    this.setState({ a: this.state.a + 1 }); // 这里跟useState不同，同步执行时useState也会对state进行逐个处理，而setState则只会处理最后一次
  };
  handleWithPromise = () => {
    Promise.resolve().then(() => {
      this.setState({ a: this.state.a + 1 });
      this.setState({ a: this.state.a + 1 });
    });
  };
  render() {
    console.log("child render");
    const A = this.state.a;
    return (
      <div>
        <h2>A11: {A}</h2>
        <button onClick={this.handle}>同步执行递增</button>
        <button onClick={this.handleWithPromise}>异步执行递增</button>
      </div>
    );
  }
}

export default ClassIndex;
