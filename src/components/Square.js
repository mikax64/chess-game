import React, { Component } from "react";

class Square extends Component {
  render() {
    const {
      refName,
      data: { name, color }
    } = this.props;
    return (
      <div
        {...this.props}
        ref={refName}
        className={`square is-${color}`}
        data-name={name}
      >
        {name}
      </div>
    );
  }
}

export default Square;
