import React, { Component } from "react";
import { connect } from "react-redux";

import Square from "./Square";
import PieceContainer from "./PieceContainer";
import { calculMovePossible } from "../redux/actions/pieceActions";

class ChessBoard extends Component {
  constructor(props) {
    super(props);
    const { board } = props;

    this.state = {
      x: 0,
      y: 0,
      chessIsMount: false
    };

    this.boardRef = React.createRef();

    board.map(el => (this[`squareRef_${el.squareName}`] = React.createRef()));
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
  };
  componentDidMount() {
    const { calculMovePossible } = this.props;
    calculMovePossible();
    this.setState({
      chessIsMount: true
    });
  }

  render() {
    const { board, pieces } = this.props;
    const { chessIsMount, playerTurn } = this.state;
    const sizeBoard = 600;

    const styles = {
      width: sizeBoard + "px",
      height: sizeBoard + "px"
    };

    return (
      <div
        style={styles}
        onMouseUp={this.showTarget}
        onMouseMove={this.onMouseMove}
        className="chessBoard"
        ref={this.boardRef}
      >
        {board.map(el => (
          <Square
            key={el.squareName}
            data={el}
            refName={this[`squareRef_${el.squareName}`]}
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
    board: state.board,
    pieces: state.pieces
  };
};

const mapDispatchToProps = dispatch => {
  return {
    calculMovePossible: () => dispatch(calculMovePossible())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChessBoard);
