import React from 'react';
import BoardCard from './BoardCard';

const BoardsHome = props => {
  const renderBoardCards = () => {
    const { boards } = props;
    return boards.map(board => {
      return (
        <BoardCard key={`board_${board.id}`} id={board.id} title={board.title} lists={board.lists} />
      );
    });
  };
  const { boards } = props;
  return (
    <div className="board-cards-container">
      { !!boards && !!boards.length &&
        renderBoardCards()
      }
    </div>
  );
};

export default BoardsHome;
