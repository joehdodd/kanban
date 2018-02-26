import React, { Component } from 'react';
import NewList from './NewList';
import List from './List';

class Board extends Component {
  renderLists = thisBoard => {
    return thisBoard.lists.map((list, index) => {
      return (
        <List
          key={`list_${list.title}`}
          index={index}
          title={list.title}
          newCard={this.props.newCard}
          cards={list.cards}
        />
      );
    });
  };
  render() {
    const { title } = this.props.location.state;
    const { boardId } = this.props.match.params;
    const [thisBoard] = this.props.boards
      .filter(board => board.id === boardId)
      .map(board => board);
    return (
      <div className="board">
        <div className="board-info-wrapper">
          <span style={{ color: 'aliceblue' }}>{title}</span>
        </div>
        <div className="lists-wrapper">
          { !!thisBoard &&
            !!thisBoard.lists &&
            !!thisBoard.lists.length &&
            this.renderLists(thisBoard)
          }
          <div className="add-list-container">
            <NewList boardId={boardId} newList={this.props.newList} />
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
