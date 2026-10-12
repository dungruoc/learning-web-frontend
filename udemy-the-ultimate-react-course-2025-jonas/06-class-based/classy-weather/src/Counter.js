import React from "react";


export default class Counter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {count: 0};
  }

  incr() {
    this.setState(st => ({...st, count: st.count + 1}));
  }

  decr() {
    this.setState(st => ({...st, count: st.count - 1}))
  }

  render() {
    const aDate = new Date();
    aDate.setDate(aDate.getDate() + this.state.count);

    return (
      <div>
        <button onClick={this.decr.bind(this)}>-</button>
        <span>{aDate.toDateString()} [{this.state.count}]</span>
        <button onClick={this.incr.bind(this)}>+</button>
      </div>
    );
  }
}