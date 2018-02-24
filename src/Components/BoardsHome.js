import React from 'react';
import BoardCard from './BoardCard';

const BoardsHome = props => {
  const renderBoardCards = () => {
    const { boards } = props;
    return boards.map(board => {
      let uniqueKey = Math.floor((1 + Math.random()) * 0x10000).toString();
      return (
        <BoardCard key={uniqueKey} title={board.title}/>
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
