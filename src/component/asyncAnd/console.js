import React, { Component } from "react";

export class ConsoleT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 0,
    };
  }
  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 1 次 log 0

    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 2 次 log 0

    setTimeout(() => {
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 3 次 log2

      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 4 次 log3
    }, 0);
  }
  render() {
    return (
      <section style={{ maxWidth: "300px", overflow: "hidden" }}>
        <img
          src="https://s2.loli.net/2022/04/30/kOweT46pM2rcudq.jpg"
          alt=""
          width={300}
          style={{ width: "480px!important" }}
        />
      </section>
    );
  }
}
