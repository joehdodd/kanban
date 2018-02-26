import React, { Component } from 'react';
import NewList from './NewList';
import List from './List';

class Board extends Component {
  renderLists = () => {
    const { lists } = this.props;
    console.log(lists);
    return lists.map((list, index) => {
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
    const { lists } = this.props;
    return (
      <div className="board">
        <div className="board-info-wrapper">
          <span style={{color: 'aliceblue'}}>{title}</span>
        </div>
        <div className="lists-wrapper">
          {!!lists &&
            !!lists.length &&
            this.renderLists()}
          <div className="add-list-container">
            <NewList newList={this.props.newList} />
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
