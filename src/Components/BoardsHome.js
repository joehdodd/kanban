import React from 'react';
import BoardCard from './BoardCard';

const BoardsHome = props => {
  const renderBoardCards = () => {
    const { boards, lists } = props;
    console.log(boards, lists);
    return boards.map(board => {
      return (
        <BoardCard key={`board_${board.title}`} title={board.title} lists={lists} />
      );
    });
  };
  const { boards } = props;
  console.log(props);
  return (
    <div className="board-cards-container">
      { !!boards && !!boards.length &&
        renderBoardCards()
      }
    </div>
  );
};

export default BoardsHome;
