import React, { Component } from "react";
import { connect } from "react-redux";
import Square from "./Square";
import PieceContainer from "./PieceContainer";
import { calculPiece } from "../redux/actions/pieceActions";

class ChessBoard extends Component {
  constructor(props) {
    super(props);
    const { squares } = props;

    this.boardRef = React.createRef();

    squares.map(
      square => (this[`squareRef_${square.name}`] = React.createRef())
    );
  }

  showTarget = e => {
    const { calculPiece, pieces } = this.props;
    console.log(this[`squareRef_a4`].current.offsetTop);
    calculPiece();
    console.log(pieces);
  };
  componentDidMount() {
    const { pieces } = this.props;
  }
  render() {
    const { squares, pieces } = this.props;

    return (
      <div onClick={this.showTarget} className="chessBoard" ref={this.boardRef}>
        {squares.map(square => (
          <Square
            key={square.name}
            data={square}
            refName={this[`squareRef_${square.name}`]}
          ></Square>
        ))}

        {pieces.map(piece => (
          <PieceContainer key={piece.name} data={piece}></PieceContainer>
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
    calculPiece: () => dispatch(calculPiece())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChessBoard);
