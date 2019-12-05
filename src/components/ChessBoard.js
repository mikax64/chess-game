import React, { Component } from "react";
import { connect } from "react-redux";

import Square from "./Square";
import PieceContainer from "./PieceContainer";
import { calculMovePossible } from "../redux/actions/pieceActions";

class ChessBoard extends Component {
  constructor(props) {
    super(props);
    const { squares } = props;

    this.state = {
      x: 0,
      y: 0,
      chessIsMount: false
    };

    this.boardRef = React.createRef();

    squares.map(
      square => (this[`squareRef_${square.name}`] = React.createRef())
    );
  }

  onMouseMove = e => {
    e.stopPropagation();
    const mouseXPosition = e.clientX - this.boardRef.current.offsetLeft;
    const mouseYPosition = e.clientY - this.boardRef.current.offsetTop;
    this.setState({ x: mouseXPosition, y: mouseYPosition });
  };

  showTarget = e => {
    const { calculMovePossible, pieces } = this.props;
    // console.log(this[`squareRef_b4`].current.offsetLeft);

    console.log(pieces);
  };
  componentDidMount() {
    const { calculMovePossible } = this.props;
    calculMovePossible();
    this.setState({
      chessIsMount: true
    });
  }

  render() {
    const { squares, pieces } = this.props;
    const { chessIsMount } = this.state;

    return (
      <div
        onMouseUp={this.showTarget}
        onMouseMove={this.onMouseMove}
        className="chessBoard"
        ref={this.boardRef}
      >
        {squares.map(square => (
          <Square
            key={square.name}
            data={square}
            refName={this[`squareRef_${square.name}`]}
          ></Square>
        ))}

        {chessIsMount &&
          pieces.map(piece => (
            <PieceContainer
              refParent={this.boardRef}
              key={piece.name}
              data={piece}
              positionpiece={this[`squareRef_${piece.currentSquare}`]}
            ></PieceContainer>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    squares: state.squares,
    pieces: state.pieces
  };
};

const mapDispatchToProps = dispatch => {
  return {
    calculMovePossible: () => dispatch(calculMovePossible())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChessBoard);
