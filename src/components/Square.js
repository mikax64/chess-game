import React, { Component } from "react";
import { connect } from "react-redux";

class Square extends Component {
  render() {
    const {
      refName,
      data: { squareName, squareColor },
      game
    } = this.props;

    const isMovePossible = game.currentMovePossible.includes(squareName)
      ? "is-movePossible"
      : "";

    return (
      <div
        ref={refName}
        className={`square is-${squareColor} ${isMovePossible}`}
        data-name={squareName}
      >
        {squareName}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    board: state.board,
    game: state.game
  };
};
export default connect(mapStateToProps, null)(Square);
