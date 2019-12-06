import React, { Component } from "react";

class Square extends Component {
  render() {
    const {
      refName,
      data: { squareName, squareColor }
    } = this.props;
    return (
      <div
        {...this.props}
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
