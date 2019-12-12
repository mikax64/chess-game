import React, { Component } from "react";
import { connect } from "react-redux";

import Square from "./Square";
import PieceContainer from "./PieceContainer";
import { calculMoves } from "../redux/actions/pieceActions";

class ChessBoard extends Component {
  constructor(props) {
    super(props);
    const { board, pieces } = props;

    this.state = {
      x: 0,
      y: 0,
      chessIsMount: false
    };

    this.boardRef = React.createRef();
  }

  onMouseMove = e => {
    e.stopPropagation();
    const mouseXPosition = e.clientX - this.boardRef.current.offsetLeft;
    const mouseYPosition = e.clientY - this.boardRef.current.offsetTop;
    this.setState({ x: mouseXPosition, y: mouseYPosition });
  };

  showTarget = e => {
    const { board, pieces } = this.props;

    //this[`squareRef_a4`].current.remove();
    //this[`pieceRef_pawn_4_white`].current.remove();

    //this[`pieceRef_knight_3_black`] = React.createRef();

    //this[`pieceRef_rook_2_white`].current.offsetLeft = 130;
  };
  componentDidMount() {
    const { calculMoves, board } = this.props;
    calculMoves();
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
          <Square key={el.squareName} data={el}></Square>
        ))}

        {chessIsMount &&
          pieces.map(el => (
            <PieceContainer
              refParent={this.boardRef}
              key={el.index}
              data={el}
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
    calculMoves: () => dispatch(calculMoves())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChessBoard);
