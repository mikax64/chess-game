import React, { Component } from "react";
import { connect } from "react-redux";
import Square from "./Square";

class ChessBoard extends Component {
  componentDidMount() {}
  render() {
    const { squares } = this.props;

    return (
      <div className="chessBoard">
        {squares.map(square => (
          <Square key={square.name} data={square}></Square>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    squares: state.squares
  };
};

export default connect(mapStateToProps, null)(ChessBoard);
