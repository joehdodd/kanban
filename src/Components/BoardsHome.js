import React from 'react';
import BoardCard from './BoardCard';

const BoardsHome = props => {
  const renderBoardCards = () => {
    const { boards } = props;
    return boards.map(board => {
     return (
       <BoardCard title={board.title}/>
     )
    })
  }
  return (
    <div className="board-cards-container">
      {renderBoardCards()}
    </div>
  )
}

export default BoardsHome;
