import React, { Component } from "react";

class PieceContainer extends Component {
  render() {
    const {
      refName,
      data: { name, color }
    } = this.props;
    return (
      <div ref={refName} className={`square is-${color}`}>
        {name}
      </div>
    );
  }
}

export default PieceContainer;
