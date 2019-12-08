import React, { Component } from "react";

class Square extends Component {
  render() {
    const {
      refName,
      data: { squareName, squareColor }
    } = this.props;

    return (
      <div
        ref={refName}
        className={`square is-${squareColor}`}
        data-name={squareName}
      >
        {squareName}
      </div>
    );
  }
}

export default Square;
