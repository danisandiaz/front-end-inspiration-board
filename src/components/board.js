import React from 'react';
import './board.css';

<<<<<<< HEAD
=======


>>>>>>> 334636b47eb0eb57ba1867ad363852e23d374c0f
const Board = ({ index, active, onClick, currentBoard, board }) => {
    return (
      <div onClick={() => {onClick(); currentBoard(board)}} className={active ? "active title box-size" : "title box-size"}>
        {index}. {board.title} - {board.owner}
      </div>
    );
  };

export default Board;