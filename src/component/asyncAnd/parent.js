import { Component } from "react";

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "cpp",
    };
  }
  componentDidMount() {
    console.log("parent ComponentDidMount");
  }
  componentWillUnmount() {
    console.log("parent componentWillUnmount");
  }
  render() {
    const { children } = this.props;
    console.log("parent render");
    return (
      <div>
        <h1>{this.state.name}</h1>
        {children}
      </div>
    );
  }
}

export default Parent;
